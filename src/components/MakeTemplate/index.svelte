<MHeader on:save={handleSaveData}/>
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
  import {onMount} from 'svelte';

  import db from "@/utils/db";
  import {getCurrentTime, sleep, replaceTableContent} from '@/utils';
  import {observeDocument} from '@/utils/observe-dom';

  import {froalaStore} from "@/store/froala";
  import {editorConfig, PG_EDITOR_CONTAINER} from '@/config/froala';
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
  // table column keys
  let columnKeys = [];

  onMount(() => {
    // 初始化froala
    initFroala();
    // 实时更新保存
    realTimeUpdateAndSave();
  })

  const initFroala = () => {
    froala = new FroalaEditor(PG_EDITOR_CONTAINER, {
      ...editorConfig,
      events: {
        'initialized': () => {
          // 获取store数据
          getInitStoreData()
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
        'commands.after': function (cmd, param1, param2) {
          const copyData = [...parameters];
          if (cmd === 'tableRemove') {
            document.getElementById(paramId).remove();
            commandsRedoAndUndo();
          }
          // 插入列
          if (cmd === 'tableColumns') {
            const res = copyData.find(item => item.id === paramId);
            // 左右侧插入列
            if (param1 === 'after' || param1 === 'before') {
              res.columnKeys.push(`column${res.columnKeys.length}`);
            }
            // 删除
            if (param1 === 'delete') {
              res.columnKeys.pop();
            }

            columnKeys = res.columnKeys;
          }
        }
        // 'contentChanged': function () {
        //   console.log(this);
        // }
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
      getUpdateParametersData();
      // 保持更新模板
      handleSaveData();
      console.log(`%c 模板保存成功✔ 更新时间: ${getCurrentTime()}`, 'color:#0f0');
    }, 60000)
  }

  const getInitStoreData = async () => {
    const {template} = await db.getItemTmp();
    const dbDataAll = await db.getAll();
    froala.html.set(template);

    const parameterNodes = getFroalaContentParams();
    if (parameterNodes?.length) {
      const ids = parameterNodes.map(node => node.getAttribute('id'));
      parameters = dbDataAll.map(item => {
        if (ids.includes(item.id)) return item;
      }).filter(item => item);
    } else {
      parameters = [];
    }
  }

  // 获取编辑区域所存在的参数
  const getFroalaContentParams = () => {
    const froalaContainer = froala.$el[0];
    const parameters = [...froalaContainer.querySelectorAll('[data-param-type]')];

    return parameters;
  }

  // 获取并且更新参数库数据
  const getUpdateParametersData = async () => {
    const parameters = await getFroalaContentParams();

    const dbDataAll = await db.getAll();
    const data = dbDataAll.map(item => {
      const isExist = parameters.find(element => element.getAttribute('id') === item.id);
      if (isExist) {
        return item
      } else {
        db.removeItem(item.id);
      }
    }).filter(item => item);

    return data;
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
      columnKeys = parameters.find(item => item.id === paramId).columnKeys;
    } else {
      columnKeys = [];
    }

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

    sleep(300).then(() => {
      parameters = newParameters;
    })
  }

  // 数据保存
  const handleSaveData = () => {
    getUpdateParametersData();

    const template = froala.html.get();
    db.setItemTmp({template: template.replace('is-active', '')});
  }
</script>

<style>

</style>
