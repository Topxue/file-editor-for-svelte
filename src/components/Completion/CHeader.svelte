<header class="pg-mk-header-wrapper uk-flex uk-flex-between">
  <div class="pg-mk-header-left-wrapper uk-flex">
    <div class="pg-header-return-back uk-margin-right">
      <i class="uk-icon uk-text-primary" uk-icon="icon: chevron-left"></i>
      <button class="uk-button uk-button-link uk-text-primary">返回</button>
    </div>
  </div>

  <div class="pg-header-center-content">
    <span class="title uk-text-emphasis">补全文件内容</span>
    <div class="description uk-text-muted">所有编辑将实时保存</div>
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
          <div class="uk-text-muted">文件：测试</div>
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
  import {createEventDispatcher, getContext} from 'svelte';

  // 事件派发
  const dispatch = createEventDispatcher();
  const params = getContext('optionsInfo');

  //  是否可以发起
  let isInitiate = false;
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
  }

  // 发起数据
  const handleInitiate = () => {
    params.getInitiate && params.getInitiate([]);
  }

</script>
<style>
    .dropdown-container {
        width: 320px;
        line-height: 20px;
        padding: 10px;
        box-sizing: border-box;
        font-size: 13px;
    }

    .dropdown-header {
        width: 170px;
        font-weight: 600;
        text-align: center;
        margin: 0 auto;
    }

    .uk-divider-small::after {
        width: 100%;
    }

    .param-list {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
    }

    .param-list span {
        color: #4c596e;
        position: relative;
        cursor: pointer;
    }

    .param-list span:hover {
        color: #2489f2;
    }

    .param-list span .is-required {
        padding-left: -8px;
        content: "*";
        color: #ed521f;
        position: absolute;
    }

    .send-disabled {
        cursor: not-allowed;
    }
</style>
