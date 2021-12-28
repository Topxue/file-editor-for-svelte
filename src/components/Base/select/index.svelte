<div class="pg-custom-select-container" style="top:{style.top}; left:{style.left}; width:{style.width}">
  <ul class="pg-select-container" class:visible transition:fly={{ duration: 80, easing: cubicInOut, y: -5 }}>
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
  import {fly} from 'svelte/transition';
  import {cubicInOut} from 'svelte/easing';

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

<style>
    .pg-custom-select-container {
        position: fixed;
        z-index: 999;
    }

    .pg-select-container {
        position: relative;
        background: #FFFFFF;
        box-sizing: border-box;
        display: none;
        font-size: 13px;
        padding: 4px 0;
        border-radius: 3px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.10);
        border: 1px solid #e4e7ed;
    }

    .pg-select-container::after {
        content: '';
        border-width: 9px;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
        width: 0;
        height: 0;
        position: absolute;
        top: -18px;
        left: 52px;
    }

    .pg-select-container .option-item {
        padding: 8px 10px;
        cursor: pointer;
        user-select: none;
        position: relative;
    }

    .pg-select-container > .is-active {
        color: #2489f2;
    }

    .option-item.is-active::after {
        content: "✔";
        position: absolute;
        right: 10px;
    }

    .pg-select-container li:hover {
        background-color: #f5f7fa;
    }

    .visible {
        display: block;
    }

</style>
