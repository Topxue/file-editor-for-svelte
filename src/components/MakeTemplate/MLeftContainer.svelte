<div class="pg-html-panel-params">
  <ul uk-tab uk-sticky>
    <li class="uk-active"><a href={"javascript:void(0)"}>参数 <sup class="uk-badge">{parameters?.length || 0}</sup></a>
    </li>
  </ul>
  <ul class="uk-list pane-params-container">
    {#each parameters as param}
      <a href="#{param.id}" uk-scroll class="uk-scroll-a">
        <li
          class="panel-param-item"
          class:is-active={param.id === checkedId}
          on:click={handleCheckCurrentParameter.bind(null, param.id)}>
          <span class="pane-params-name" class:required={param.isRequired}>{param.name}</span>
          <span class="pane-params-icon {ICON_ENUM[param?.paramType]}"></span>
          <span
            class="pane-params-close uk-icon"
            uk-icon="close"
            on:click|stopPropagation={dispatch('delete', param.id)}>
        </span>
        </li>
      </a>
    {/each}
  </ul>
</div>

<script>
  import {createEventDispatcher} from 'svelte';
  import {froalaStore} from "@/store/froala";
  import {ICON_ENUM} from '@/config/parameter';

  // 事件派发
  const dispatch = createEventDispatcher();

  // 参数集合
  export let parameters = [];
  // 当前选择参数id
  export let checkedId = null;
  // 获取froala实例
  let froala = null;
  froalaStore.subscribe(value => {
    froala = value;
  })

  // 获取选择活动参数
  const getCurrentParameter = (id) => {
    let froalaContainer = froala.$el[0];
    return froalaContainer.querySelector(`[id=${id}]`);
  }

  // 选中参数
  const handleCheckCurrentParameter = (id) => {
    checkedId = id;
    const parameter = getCurrentParameter(id);
    parameter.click();
  }

</script>

