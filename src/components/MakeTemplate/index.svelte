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
  // TODO 更新窗格参数-回滚、撤销、删除操作 实时更新数据;
  import {onMount} from 'svelte';

  import db from "@/utils/db";
  import {getCurrentTime} from '@/utils/index';

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
    // 初始化froala
    initFroala();
    // 实时更新保存
    realTimeUpdateAndSave();
  })

  const initFroala = () => {
    froala = new FroalaEditor('#pg-editor-container', {
      ...editorConfig,
      events: {
        'click': (clickEvent) => {
          handleClickEditor(clickEvent);
        }
      }
    });
    froalaStore.set(froala);
  }

  const realTimeUpdateAndSave = () => {
    setInterval(() => {
      const template = froala.html.get();
      db.setItemTmp({template: template.replace('is-active', '')});
      console.log(`%c 模板保存成功✔ 更新时间: ${getCurrentTime()}`, 'color:#0f0');
    }, 60000)
  }

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
