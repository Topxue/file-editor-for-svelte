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
  <MRightContainer paramId={paramId} on:autoActive={handleAutoActive}/>
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
  // 编辑区域容器
  let froalaContainer = null;

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
          froalaContainer = froala.$el[0];
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
        // 'image.resize': function (img) {
        //   console.log(img);
        // },
        'commands.redo': () => {
          commandsRedoAndUndo();
        },
        'commands.undo': () => {
          commandsRedoAndUndo();
        },
        'commands.after': function (cmd, param) {
          // 监听table删除
          if (cmd === 'tableRemove') handleTableRemove();
          // 插入列
          if (cmd === 'tableColumns') handleInsertTableColumns(param);
          // 清楚格式
          if (cmd === 'clearFormatting') handleResetTableStyled();
          // 监听图片大小设置
          if (cmd === 'imageSize') handleImageSettingSize();
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

  // 参数编辑自动展开
  const handleAutoActive = (event) => {
    froala.toolbar.enable();

    const target = event.detail;
    paramId = target?.getAttribute('id');

    currentActiveParameter(target);
  }

  // 删除参数
  const handleDeleteParameter = (event) => {
    const deleteId = event.detail;
    const parameter = froalaContainer.querySelector(`[id=${deleteId}]`);

    parametersStore.deleteItem(deleteId);
    parameter.remove();
  }

  // 操作回滚
  const commandsRedoAndUndo = debounce(() => {
    const freezeData = parametersStore.getFreezeData();

    const parameterArray = [...froalaContainer.querySelectorAll('[data-param-type]')] || [];

    const parameters = parameterArray.map(node => {
      const id = node.getAttribute('id');

      return freezeData.find(item => item.id === id);
    }).filter(item => item);

    parametersStore.updateParameters(parameters)
  }, 300)

  // 清楚格式 重置 table样式
  const handleResetTableStyled = () => {
    const tables = froalaContainer.querySelectorAll('table');

    tables.forEach(table => {
      const ths = table.querySelectorAll('th'), tds = table.querySelectorAll('td');
      table.style.width = '100%';
      tds.forEach(td => td.style.width = '10%');

      if (ths.length) {
        ths.forEach((th, index) => th.setAttribute('data-pg-th', `column${index}`))
      }
    })
  }

  // table 删除
  const handleTableRemove = () => {
    const tableContainer = document.getElementById(paramId);
    if (tableContainer) {
      tableContainer.remove();
    }
    commandsRedoAndUndo();
  }

  // table 插入列
  const handleInsertTableColumns = (param) => {
    const copyData = [...parameters];

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

  // 图片设置宽高校验
  const handleImageSettingSize = () => {
    const IMAGE_GROUP_WRAPPER = document.querySelector('.fr-image-group');
    const inputs = IMAGE_GROUP_WRAPPER.querySelectorAll('input');

    inputs.forEach(node => {
      node.addEventListener('input', (event) => {
        const target = event.target,
          value = target.value.split('px')[0],
          name = target.getAttribute('name');

        const judge = name === 'width' ? 674 : 903;
        if (value > judge) {
          target.value = '';
          target.focus();

          const message = `图片参数${name === 'width' ? '宽' : '高'}度最大${judge}px`
          UIkit?.notification({
            message,
            status: 'danger',
            timeout: 2800,
          })
        }
      })
    })
  }
</script>
