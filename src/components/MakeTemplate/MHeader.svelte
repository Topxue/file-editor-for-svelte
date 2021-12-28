<header class="pg-mk-header-wrapper uk-flex uk-flex-between">
  <div class="pg-mk-header-left-wrapper uk-flex">
    <div class="pg-header-return-back uk-margin-right">
      <i class="uk-icon uk-text-primary" uk-icon="icon: chevron-left"></i>
      <button class="uk-button uk-button-link uk-text-primary">返回</button>
    </div>
    <div class="uk-width-1-4">
      <input
        type="text"
        class="uk-input uk-form-width-small uk-form-small"
        bind:value="{titleValue}">
    </div>
    <div class="document-update-time uk-text-muted uk-margin-small-left">保存成功，更新时间{updateTime}</div>
  </div>

  <div class="pg-mk-header-right-wrapper">
    <button class="uk-button uk-button-link uk-text-primary"><i class="uk-icon" uk-icon="icon:download"></i>下载</button>
    <button class="uk-button uk-button-default uk-button-small">预览</button>
    <button class="uk-button uk-button-primary uk-button-small" on:click={ () => dispatch('save')}>保存</button>
  </div>
</header>
<script>
  import {createEventDispatcher} from 'svelte';

  let titleValue = '无标题文档';
  let updateTime = '2021-12-06 17:05:50';

  // 事件派发
  const dispatch = createEventDispatcher();

</script>
