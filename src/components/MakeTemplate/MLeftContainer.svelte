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
            class="pane-params-close"
            uk-toggle="target: #dialog-container"
            on:click|stopPropagation|preventDefault={() => deleteId = param.id}
          >
             <i class="fa fa-times-circle" aria-hidden="true"></i>
        </span>
        </li>
      </a>
    {/each}
  </ul>

  <Dialog message="确认删除该参数?" on:click={dispatch('delete', deleteId)}/>
</div>


<script>
  import {createEventDispatcher} from 'svelte';
  import {ICON_ENUM} from '@/config/parameter';
  import {froalaStore, parametersStore} from "@/store/froala";

  import Dialog from '@/components/Base/dialog';


  // 当前选择参数id
  export let checkedId = null;
  // 当前删除Id
  let deleteId = null;

  // 事件派发
  const dispatch = createEventDispatcher();

  // 参数集合
  $:parameters = $parametersStore.data?.parameters || [];

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

