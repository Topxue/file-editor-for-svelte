<div class="pg-accordion-wrapper">
  <div class="pg-accordion-title" class:disabled on:click={handleClick}>
    <span>{title}</span>
    <i class="fa fa-angle-double-{visible ? 'up' : 'down'}" aria-hidden="true"></i>
  </div>
  {#if visible}
    <div class="pg-accordion-content" transition:fade={{y: 100,duration: 300}}>
      <slot></slot>
    </div>
  {/if}
</div>

<script>
  import {fade} from 'svelte/transition';

  export let visible = false;
  export let title = '折叠面版';
  export let disabled = false;

  const handleClick = () => {
    if (disabled) return;

    visible = !visible;
  }
</script>
