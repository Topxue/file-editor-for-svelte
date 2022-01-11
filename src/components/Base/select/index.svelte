<div class="pg-custom-select-container" style="top:{style.top}; left:{style.left}; width:{style.width}">
  <ul class="pg-select-container" class:visible>
    {#each data as item}
      {#if multiple}
        <li
          class="option-item"
          class:is-active={value.includes(item)}
          on:click={() => handleCheckClick(item)}>{item}</li>
      {:else }
        <li class:is-active={item == value[0]} class="option-item" on:click={() => handleCheckClick(item)}>{item}</li>
      {/if}
    {/each}
  </ul>
</div>

<script>
  import {createEventDispatcher} from 'svelte';

  let style = {};

  // 显示状态
  export let visible = false;
  export let value = [];
  export let data = [];
  export let target = null;
  // 是否多选
  export let multiple = false;

  // 事件派发
  const dispatch = createEventDispatcher();

  $: {
    if (target) {
      const {top, left} = target.getBoundingClientRect();
      const domH = +window.getComputedStyle(target).height.split('px')[0],
        domW = window.getComputedStyle(target).width;

      style = {
        width: domW,
        left: left + 'px',
        top: top + domH + 12 + 'px'
      }
    }
  }

  const handleCheckClick = (val) => {
    if (value.includes(val)) {
      value = value.filter(item => item != val);
    } else {
      if (!multiple) {
        value = [val];
      } else {
        if (!value) {
          value = []
        }
        value.push(val);
      }
    }

    dispatch('select', value);
  }
</script>
