<!--<MHeader on:save={handleSaveData}/>-->
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
  <MRightContainer
    paramId={paramId}
    columnKeys={columnKeys}
    on:add={handleAddParameter}
    on:update={handleUpdateParameterName}/>
</div>


<script>
  import {onMount, getContext} from 'svelte';

  import db from "@/utils/db";
  import {
    sleep,
    getCurrentTime,
    replaceTableContent,
    getFroalaContentParams,
    getUpdateParametersData
  } from '@/utils';
  import {observeDocument} from '@/utils/observe-dom';

  import {froalaStore, parametersStore} from "@/store/froala";
  import {editorConfig, PG_EDITOR_CONTAINER} from '@/config/froala';
  import {currentActiveParameter} from '@/event/viewEvent';

  // import MHeader from './MHeader.svelte';
  import MLeftContainer from './MLeftContainer.svelte';
  import MRightContainer from './MRightContainer.svelte';

  // 当前参数id
  let paramId = null;
  // 窗格参数集合
  let parameters = [];
  // 编辑器实例
  let froala = null;
  // table column keys
  let columnKeys = [];

  let frPopup = null;

  const params = getContext('optionsInfo');

  onMount(() => {
    // 初始化froala
    initFroala();
    // 实时更新保存
    // realTimeUpdateAndSave();
  })

  const initFroala = () => {
    froala = new FroalaEditor(PG_EDITOR_CONTAINER, {
      ...editorConfig,
      events: {
        'initialized': () => {
          // 获取store数据
          getInitStoreData();
        },
        'click': (clickEvent) => {
          handleClickEditor(clickEvent);
        },
        'table.inserted': function (table) {
          this.html.insert(replaceTableContent(table));
        },
        'commands.redo': () => {
          commandsRedoAndUndo();
        },
        'commands.undo': () => {
          commandsRedoAndUndo();
        },
        'commands.after': function (cmd, param) {
          const copyData = [...parameters];
          if (cmd === 'tableRemove') {
            const tableContainer = document.getElementById(paramId);
            if (tableContainer) {
              tableContainer.remove();
            }
            commandsRedoAndUndo();
          }
          // 插入列
          if (cmd === 'tableColumns') {
            const res = copyData.find(item => item.id === paramId);
            // 左右侧插入列
            if (param === 'after' || param === 'before') {
              res.columnKeys.push(`column${res.columnKeys.length}`);
            }
            // 删除
            if (param === 'delete') {
              res.columnKeys.pop();
            }

            columnKeys = res.columnKeys;
          }
        }
      }
    });
    froalaStore.set(froala);
    observeDocument(froala, commandsRedoAndUndo);
  }

  const realTimeUpdateAndSave = () => {
    setInterval(() => {
      const template = froala.html.get();
      db.setItemTmp({template: template.replace('is-active', '')});
      // 定时清理更新数据
      getUpdateParametersData(froala);
      // 保持更新模板
      handleSaveData();
      console.log(`%c 模板保存成功✔ 更新时间: ${getCurrentTime()}`, 'color:#0f0');
    }, 60000)
  }

  const getInitStoreData = () => {
    const data = params?.data;
    if (data) {
      froala.html.set(params?.data?.template);
      parameters = data?.parameters || [];
      data?.parameters.forEach(item => {
        db.setItem(item.id, item);
      })
    }
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

    if (paramId) {
      console.log(parameters, 'parameters..')
      const res = parameters.find(item => item.id === paramId);
      columnKeys = res?.columnKeys || [];
    } else {
      columnKeys = [];
    }

    //重置 img popup位置
    if (target && target.tagName === 'IMG') {
      setImagePopupPosition(target)
    }

    // 当前活动参数
    currentActiveParameter(target);
  }

  const setImagePopupPosition = async (target) => {
    const {top} = target.getBoundingClientRect();
    const imgHeight = +window.getComputedStyle(target).width.split('px')[0];

    setTimeout(() => {
      frPopup = document.querySelector('.fr-popup');
      frPopup.style.top = top + imgHeight + 42 + 'px';
    })
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

  // 操作回滚
  const commandsRedoAndUndo = () => {
    const froalaContainer = froala.$el[0];
    const parameterArray = [...froalaContainer.querySelectorAll('[data-param-type]')] || [];

    const newParameters = [];
    parameterArray.forEach(async node => {
      const id = node.getAttribute('id');
      const res = await db.getItem(id);
      res && newParameters.push(res);
    })

    sleep(500).then(() => {
      parameters = newParameters;
    })
  }

  // 数据保存
  const handleSaveData = async () => {
    const parameters = await getUpdateParametersData(froala);
    const template = froala.html.get().replace('is-active', '');

    await db.setItemTmp({template});

    // 执行参数回调
    params.getData && params.getData({
      template,
      parameters
    })
  }
</script>
