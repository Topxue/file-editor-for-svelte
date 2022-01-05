<header class="initiate-header-wrapper uk-flex uk-flex-between">
  <div class="pg-mk-header-left-wrapper uk-flex">
    <div class="pg-header-return-back uk-margin-right">
<!--      <i class="uk-icon uk-text-primary" uk-icon="icon: chevron-left"></i>-->
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <button class="uk-button uk-button-link uk-text-primary" on:click={handleBack}>返回</button>
    </div>
  </div>

  <div class="pg-header-center-content">
    <span class="title uk-text-emphasis">补全文件内容</span>
    <div class="description uk-text-muted">所有编辑将实时保存
      {#if isWrite}
        <span>| <i class="fa fa-pencil" aria-hidden="true"></i> 输入中...</span>
      {:else if realTime}
        <span> |  {realTime}</span>
        {#if timeAgo}
          <span>{'(' + timeAgo + ')'}</span>
        {/if}
        <span>自动保存成功</span>
      {/if}
    </div>
  </div>

  <div class="pg-mk-header-right-wrapper">
    <!--    <button class="uk-button uk-button-link uk-text-primary">保存草稿</button>-->
    <!--    <button class="uk-button uk-button-default uk-button-small">指定签署位置</button>-->
    <div class="uk-inline">
      <button
        class="uk-button uk-button-primary uk-button-small"
        class:send-disabled={isInitiate}
        disabled={isInitiate}
        on:click={handleInitiate}
      >发起
      </button>
      {#if isInitiate}
        <div class="dropdown-container" uk-dropdown>
          <div class="dropdown-header uk-text-emphasis">尚有未填写完成的必填内容 需要全部填写完成后才可发起</div>
          <hr class="uk-divider-small">
          <div class="uk-text-emphasis">未填写的必填参数：（点击参数名称可定位）</div>
          <div class="uk-text-muted">文件：{params.data?.fileName || ''}</div>
          <div class="param-list">
            {#each requireData as item}
              <a
                class="uk-scroll-a"
                uk-scroll
                class:is-required={item.isRequired}
                href="#{item.id}"
                on:click={dispatch('scroll', item.id)}><span>{item.name}</span></a>
            {/each}
          </div>
        </div>
      {/if}
    </div>

  </div>
</header>

<script>
  import {createEventDispatcher, getContext, onDestroy} from 'svelte';
  import {debounce, getCurrentTime, timeFormat} from '@/utils';
  import {froalaStore} from '@/store/froala';

  // 事件派发
  const dispatch = createEventDispatcher();
  const params = getContext('optionsInfo');

  //  是否可以发起
  let isInitiate = true;
  let realTime = '';
  let timeAgo = '';
  let isWrite = false;

  let editTime = null;

  let timeId = null;

  // 状态锁
  let lock = false;

  let froala = null;
  froalaStore.subscribe(value => {
    froala = value;
  })

  // 参数
  export let parametersData = [];
  let requireData = [];

  $:if (parametersData?.length) {
    requireData = parametersData.filter(item => {
      if (item.isRequired) {
        if (!item.defaultValue && item.paramType !== 'image') {
          return item
        } else {
          if (!item?.imgUrl && item.paramType === 'image') return item;
        }
      }
    })

    isInitiate = requireData.length;

    if (lock) {
      isWrite = true;
      handleRealTime();
    }

    lock = true;
  }

  const handleRealTime = debounce(() => {
    isWrite = false;
    editTime = Date.parse(new Date())
    realTime = getCurrentTime();

    handleGetTimeAgo();
    handleRealSave();
  }, 1000)

  const handleGetTimeAgo = () => {
    clearInterval(timeId);
    timeId = setInterval(() => {
      timeAgo = timeFormat(editTime);
    }, 1000);
  }

  // 实时保存
  const handleRealSave = () => {
    const template = froala.html?.get().replace('is-active', '') || '';

    params?.realSave && params?.realSave({
      template,
      parameters: parametersData
    })
  }

  // 返回
  const handleBack = () => {
    params.back && params.back();
  }

  // 发起数据
  const handleInitiate = () => {
    const template = froala.html?.get().replace('is-active', '') || '';

    params.getInitiate && params.getInitiate({
      template,
      parameters: parametersData
    });
  }

  onDestroy(() => {
    clearInterval(timeId);
  })

</script>
