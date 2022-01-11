<!--<MHeader on:save={handleSaveData}/>-->
<div id="pg-toolbar-container"></div>
<div class="pg-editor-body-container">
  <!--  窗格参数-->
  <MLeftContainer
    checkedId={paramId}
    on:delete={handleDeleteParameter}
  />
  <!-- 编辑容器 -->
  <div id="pg-editor-container" class="pg-editor-container"></div>
  <!-- 参数设置 -->
  <MRightContainer paramId={paramId}/>
</div>

<script>
  import {onMount} from 'svelte';

  import {debounce, replaceTableContent} from '@/utils';
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
  // 外部传入的参数
  let params = null;
  // 编辑器实例
  let froala = null;

  let frPopup = null;

  parametersStore.subscribe(option => {
    params = option;
    parameters = option.data.parameters;
  })

  onMount(() => {
    // 初始化froala
    initFroala();
  })

  const initFroala = () => {
    froala = new FroalaEditor(PG_EDITOR_CONTAINER, {
      ...editorConfig,
      events: {
        'initialized': () => {
          // 获取store数据
          getInitStoreData();
          resetToolBarContainer();
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
            if (!res) return;
            // 左右侧插入列
            if (param === 'after' || param === 'before') {
              res.columnKeys.push(`column${res.columnKeys.length}`);
            }
            // 删除
            if (param === 'delete') {
              res.columnKeys.pop();
            }

            parametersStore.updateData();
          }
        }
      }
    });

    froalaStore.set(froala);
    observeDocument(froala, commandsRedoAndUndo);
  }

  const getInitStoreData = () => {
    const data = params?.data;
    if (data) {
      froala.html.set(params?.data?.template);
      parameters = data?.parameters || [];
    }

    const froalaContainer = froala.$el[0];
    const selects = [...froalaContainer.querySelectorAll('input[type=radio]'), ...froalaContainer.querySelectorAll('input[type=checkbox]')];
    if (selects.length) {
      selects.forEach(node => node.setAttribute('onclick', 'return false;'))
    }
  }

  // 重装 tool bar
  const resetToolBarContainer = () => {
    const toolBar = document.querySelector('.fr-toolbar');
    toolBar.remove();

    const customToolBarContainer = document.querySelector('#pg-toolbar-container');
    customToolBarContainer.append(toolBar);
  }

  // 编辑区域注册事件
  const handleClickEditor = (event) => {
    froala.toolbar.enable();

    const target = event.target.closest('[data-param-type]');
    paramId = target?.getAttribute('id');

    // 当前活动参数
    currentActiveParameter(target);
  }

  // 删除参数
  const handleDeleteParameter = (event) => {
    const deleteId = event.detail;
    const froalaContainer = froala.$el[0];
    const parameter = froalaContainer.querySelector(`[id=${deleteId}]`);

    parametersStore.deleteItem(deleteId);
    parameter.remove();
  }

  // 操作回滚
  const commandsRedoAndUndo = debounce(() => {
    const froalaContainer = froala.$el[0];
    const freezeData = parametersStore.getFreezeData();

    const parameterArray = [...froalaContainer.querySelectorAll('[data-param-type]')] || [];

    const parameters = parameterArray.map(node => {
      const id = node.getAttribute('id');

      return freezeData.find(item => item.id === id);
    }).filter(item => item);

    parametersStore.updateParameters(parameters)
  }, 300)
</script>
