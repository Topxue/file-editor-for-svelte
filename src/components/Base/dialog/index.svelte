<div id={id} class="pg-dialog-container" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <h3 class="uk-modal-title">{title}</h3>
    <span>{message}</span>
    <div class="uk-text-right dialog-button-container">
      {#if isCancel}
        <button class="uk-button uk-button-default uk-button-small uk-modal-close" type="button">取消</button>
      {/if}
      <button
        class="uk-button uk-button-primary uk-button-small uk-modal-close"
        type="button"
        on:click>{buttonText}</button>
    </div>
  </div>
</div>

<script>
  export let title = '提示'
  export let message = ''
  export let id = 'dialog-container';
  export let isCancel = true;
  export let buttonText = '确定';
</script>

