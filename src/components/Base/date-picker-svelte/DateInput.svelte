<script>
  import {createEventDispatcher} from 'svelte';
  import {fly} from 'svelte/transition';
  import {cubicInOut} from 'svelte/easing';
  import {toText} from './date-utils.js';
  import {parse, createFormat} from './parse';
  import DateTimePicker from './DatePicker.svelte';
  import {writable} from 'svelte/store';

  const dispatch = createEventDispatcher();

  function handleSelectDate() {
    setTimeout(() => {
      dispatch('select', text)
    })
  }

  const defaultDate = new Date();
  // inner date value store for preventing value updates (and also
  // text updates as a result) when date is unchanged
  const innerStore = writable(defaultDate);
  const store = (() => {
    return {
      subscribe: innerStore.subscribe,
      set: (d) => {
        if (d.getTime() !== $innerStore.getTime()) {
          innerStore.set(d);
          value = d;
        }
      },
    };
  })();
  /** Date value */
  export let value = defaultDate;
  $: store.set(value);
  /** The earliest value the user can select */
  export let min = new Date(defaultDate.getFullYear() - 20, 0, 1);
  /** The latest value the user can select */
  export let max = new Date(defaultDate.getFullYear(), 11, 31, 23, 59, 59, 999);
  /** Placeholder text to show when input field is empty */
  export let placeholder = '2020-12-31 23:00:00';
  /** Whether the text is valid */
  export let valid = true;
  /** Format string */
  export let format = 'yyyy-MM-dd HH:mm:ss';
  let formatTokens = createFormat(format);
  $: formatTokens = createFormat(format);
  /** Locale object for internationalization */
  export let locale = {};

  function valueUpdate(value, formatTokens) {
    text = toText(value, formatTokens);

    handleSelectDate();
  }

  $: valueUpdate($store, formatTokens);
  export let text = toText($store, formatTokens);
  let textHistory = [text, text];
  $: textHistory = [textHistory[1], text];

  function textUpdate(text, formatTokens) {
    const result = parse(text, formatTokens, $store);
    if (result.date !== null) {
      valid = true;
      store.set(result.date);
    } else {
      valid = false;
    }
  }

  $: textUpdate(text, formatTokens);

  function input(e) {
    if (e instanceof InputEvent &&
      e.inputType === 'insertText' &&
      typeof e.data === 'string' &&
      text === textHistory[0] + e.data) {
      let result = parse(textHistory[0], formatTokens, $store);
      if (result.missingPunctuation !== '' && !result.missingPunctuation.startsWith(e.data)) {
        text = textHistory[0] + result.missingPunctuation + e.data;
      }
    }
  }

  /** Whether the date popup is visible */
  export let visible = false;
  // handle on:focusout for parent element. If the parent element loses
  // focus (e.g input element), visible is set to false
  function onFocusOut(e) {
    if ((e === null || e === void 0 ? void 0 : e.currentTarget) instanceof HTMLElement &&
      e.relatedTarget &&
      e.relatedTarget instanceof Node &&
      e.currentTarget.contains(e.relatedTarget)) {
      return;
    } else {
      visible = false;
    }
  }

  function keydown(e) {
    if (e.key === 'Escape' && visible) {
      visible = false;
      e.preventDefault();
      // When the date picker is open, we prevent 'Escape' from propagating,
      // so for example a parent modal won't be closed
      e.stopPropagation();
    } else if (e.key === 'Enter') {
      visible = !visible;
      e.preventDefault();
    }
  }
</script>

<div class="date-time-field" on:focusout={onFocusOut} on:keydown={keydown}>
  <input
    class="uk-input uk-form-small uk-text-emphasis"
    class:invalid={!valid}
    type="text"
    bind:value={text}
    {placeholder}
    on:focus={() => (visible = true)}
    on:mousedown={() => (visible = true)}
    on:input={input}
    readonly
  />
  {#if visible}
    <div class="picker" class:visible transition:fly={{ duration: 80, easing: cubicInOut, y: -5 }}>
      <DateTimePicker
        on:focusout={onFocusOut}
        bind:value={$store} {min} {max} {locale}
        on:select={handleSelectDate}
        on:hidden={onFocusOut}/>
    </div>
  {/if}
</div>

<style>.date-time-field {
    position: relative;
}

.picker {
    display: none;
    position: absolute;
    margin-top: 10px;
    z-index: 10;
}

.picker.visible {
    display: block;
}
</style>
