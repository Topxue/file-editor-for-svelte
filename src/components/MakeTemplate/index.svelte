<MHeader/>
<div id="pg-toolbar-container"></div>
<div class="pg-editor-body-container">
  <!--  窗格参数-->
  <MLeftContainer
    checkedId={paramId}
    parameters={parameters}
    on:delete={handleDeleteParameter}
  />
  <!-- 编辑容器 -->
  <div id="pg-editor-container" class="pg-editor-container"></div>
  <!-- 参数设置 -->
  <MRightContainer paramId={paramId} on:add={handleAddParameter} on:update={handleUpdateParameterName}/>
</div>


<script>
  import {onMount} from 'svelte';

  import db from "@/utils/db";

  import {froalaStore} from "@/store/froala";
  import {editorConfig} from '@/config/froala';
  import {currentActiveParameter} from '@/event/viewEvent';

  import MHeader from './MHeader.svelte';
  import MLeftContainer from './MLeftContainer.svelte';
  import MRightContainer from './MRightContainer.svelte';

  // 当前参数id
  let paramId = null;
  // 窗格参数集合
  let parameters = [];

  // 编辑器实例
  let froala = null;
  onMount(() => {
    froala = new FroalaEditor('#pg-editor-container', {
      ...editorConfig,
      events: {
        'click': (clickEvent) => {
          handleClickEditor(clickEvent);
        }
      }
    });

    froalaStore.set(froala);
  })

  // 添加参数
  const handleAddParameter = async (event) => {
    const id = await event.detail;
    const data = await db.getItem(id);

    parameters = [...parameters, data];
  }

  const handleClickEditor = (event) => {
    const target = event.target.closest('[data-param-type]');
    paramId = target?.getAttribute('id');
    // 当前活动参数
    currentActiveParameter(target);
  }

  // 参数编辑-name
  const handleUpdateParameterName = (event) => {
    const {id, name, isRequired} = event.detail;

    const currentParameter = parameters.find(item => item.id === id);
    currentParameter.name = name;
    currentParameter.isRequired = isRequired;

    parameters = [...parameters];
  }

  // 删除参数
  const handleDeleteParameter = (event) => {
    const deleteId = event.detail;
    const froalaContainer = froala.$el[0];
    const parameter = froalaContainer.querySelector(`[id=${deleteId}]`);

    parameters = parameters.filter(item => item.id !== deleteId);
    parameter.remove();
    db.removeItem(deleteId);
  }
</script>
