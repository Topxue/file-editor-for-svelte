<div class="pg-html-panel-params">
  <Accordion title="参数库">
    <div class="pg-parameter-container">
      {#each PARAMETERS as params}
        {#if params.type === 'table'}
          <div class="pg-param-item" data-param-type={params.type}>
            <i class="fa {params.icon}"></i>
            <span>{params.label}</span>
          </div>
          <div class="select-table-container" uk-drop="mode: click;pos: bottom-center">
            <div class="select-table">
              <div class="uk-text-muted pg-text-panel">{tableTitle}</div>
              <div class="pg-table-selector-wrapper" id="pg-table-selector-wrapper" on:mouseleave={handleMouseLeave}>
                {#each [...Array(10).keys()] as r}
                  {#each [...Array(10).keys()] as c}
                    <span
                      data-row="{r}"
                      data-col="{c}"
                      class="pg-row-col-item uk-drop-close"
                      on:mouseover={() => handleMouseover(r, c)}
                      on:click={() => handleInsertTable(r, c)}
                    >
                    </span>
                  {/each}
                {/each}
              </div>
              <hr class="uk-column-divider uk-margin-small"/>
              <button class="uk-button uk-button-link custom-row-col" uk-toggle="target: #modal-custom-col">
                自定义行列数
              </button>
              <div id="modal-custom-col" class="pg-modal-custom-col" uk-modal>
                <div class="uk-modal-dialog uk-modal-body">
                  <div class="uk-text-emphasis uk-drop-close" id="custom-col-trigger-wrapper">自定义列数</div>
                  <form class="uk-form uk-flex uk-margin-small-top" id="from-custom-col">
                    <div class="uk-flex uk-flex-align-items">
                      <label class="uk-form-label uk-margin-small-right" for="">行数</label>
                      <div class="uk-form-controls">
                        <input
                          class="uk-input uk-form-small"
                          type="text"
                          maxlength="2"
                          bind:value={tableRow}
                          on:input={handleChangeTableRow}
                          placeholder="请输入行数">
                      </div>
                    </div>
                    <div class="uk-flex uk-flex-align-items uk-margin-small-left">
                      <label class="uk-form-label uk-margin-small-right" for="">列数</label>
                      <div class="uk-form-controls">
                        <input
                          class="uk-input uk-form-small"
                          type="text"
                          maxlength="2"
                          bind:value={tableCol}
                          on:input={handleChangeTableCol}
                          placeholder="请输入列数">
                      </div>
                    </div>
                  </form>
                  <p class="uk-text-right uk-margin">
                    <button class="uk-button uk-button-default uk-button-small uk-modal-close" type="button">取消</button>
                    <button
                      class="uk-button uk-button-primary uk-button-small uk-modal-close"
                      type="button"
                      on:click={handleCustomTableRowCol}>确定
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        {:else }
          <div
            class="pg-param-item"
            on:click={() => handleInsertParameter(params.type)}
          >
            <i class="{params.icon}"></i>
            <span>{params.label}</span>
          </div>
        {/if}

      {/each}
    </div>
  </Accordion>

  <Accordion title="参数编辑" visible="{isVisible}" disabled="{!isVisible}">
    <div class="pg-edit-item-wrapper">
      <ul uk-accordion>
        <li>
          <a class="uk-accordion-title parameter-instruction" href="#">参数使用说明</a>
          <div class="uk-accordion-content">
            {@html underDescription[paramType]}
          </div>
        </li>
      </ul>
      <!--参数名称-->
      <div class="uk-margin-small-top">
        <label class="uk-form-label" for="">参数名称</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input
            class="uk-input uk-form-small uk-text-emphasis"
            type="text"
            name="name"
            maxlength="30"
            placeholder="请输入参数名称"
            bind:value={data.name}
            required
            on:input={(event) => handleEditInputEvent('name', event)}
          >
        </div>
      </div>

      <!--默认值-->
      {#if isDefaultValue}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">默认值</label>
          <div class="uk-form-controls uk-margin-small-top">
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              bind:value={data.defaultValue}
              name="defaultValue"
              placeholder="请输入默认值"
              maxlength={data.maxLength}
              on:input={() => handleEditInputEvent('defaultValue')}
            >
          </div>
        </div>
      {/if}


      <!--身份证默认值-->
      {#if idCardDefault}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">默认值</label>
          <div class="uk-form-controls uk-margin-small-top">
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              bind:value={data.defaultValue}
              name="defaultValue"
              placeholder="请输入默认值"
              maxlength="18"
              on:input={handleEditIdCardInputEvent}
            >
          </div>
        </div>
      {/if}

      <!--table默认值-->
      {#if tableDefault}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">默认值</label>
          <div class="uk-form-controls uk-margin-small-top">
            <div class="uk-text-muted">请直接在表格中编辑表头及初始值</div>
          </div>
        </div>
      {/if}

      <!--日期默认值-->
      {#if dateDefault}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">默认值</label>
          <div class="uk-form-controls uk-margin-small-top">
            <input
              id="date-select"
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              name="defaultValue"
              placeholder="请选择"
              readonly
              bind:value={data.defaultValue}
            >
          </div>
        </div>
      {/if}


      <!--日期格式-->
      {#if dateDefault}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">日期格式</label>
          <div class="uk-form-controls uk-margin-small-top">
            <select
              class="uk-select uk-form-small uk-text-emphasis"
              name="format"
              bind:value={data.format}
              on:change={handleChangeDateFormat}
            >
              {#each DATE_FORMAT_OPTIONS as date}
                <option value={date.value}>{date.label}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}

      <!--布局-->
      {#if optionSet}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">布局</label>
          <div class="uk-form-controls uk-margin-small-top">
            <select
              class="uk-select uk-form-small uk-text-emphasis"
              name="layout"
              bind:value={data.layout}
              on:change={() => handleEditChangeEvent('layout')}
            >
              {#each LAYOUT_OPTIONS as layout, id}
                <option value="{layout.value}">{layout.label}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}

      <!--外观-->
      {#if isStyle}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">外观</label>
          <div class="uk-form-controls uk-margin-small-top">
            {#each GET_BORDERS(paramType) as item, index}
              <label class="{index > 0 ? 'uk-margin-small-left' : ''}">
                <input
                  class="uk-radio"
                  type="radio"
                  value={item.value}
                  name="style"
                  bind:group={data.style}
                  on:change={() => handleEditChangeEvent('style')}
                >
                <span class:bottom={item.value === 'bottom'}
                      class:borderAll={item.value === 'all'}>{item.label}</span>
              </label>
            {/each}
          </div>
        </div>
      {/if}

      <!--控件大小-->
      {#if isSize}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">控件大小</label>
          <div class="uk-form-controls uk-margin-small-top control-size-container">
            {#each CONTROL_OPTIONS as item}
              <label>
                <input
                  class="uk-radio"
                  type="radio"
                  value={item.value}
                  name="size"
                  bind:group={sizeChecked}
                  on:change={() => handleEditChangeEvent('size')}
                >
                <span>{item.label}</span>
              </label><br/>
            {/each}
            <div class="uk-margin-small uk-flex uk-flex-between" id="toggle-usage" {hidden}>
              <div class="uk-width-1-2 uk-flex uk-flex-align-items">
                <label class="uk-form-label uk-margin-small-right" for="">宽</label>
                <div class="uk-form-controls uk-margin-small-right">
                  <input
                    class="uk-input uk-form-small uk-text-emphasis"
                    min="148"
                    bind:value={size.width}
                    name="width"
                    type="text"
                    maxlength="3"
                    placeholder="请输入"
                    on:input={() => handleEditInputEvent('width')}
                  >
                </div>
              </div>
              <div class="uk-width-1-2 uk-flex uk-flex-align-items">
                <label class="uk-form-label uk-margin-small-right" for="">高</label>
                <div class="uk-form-controls">
                  <input
                    class="uk-input uk-form-small uk-text-emphasis"
                    min="17"
                    bind:value={size.height}
                    name="height"
                    type="text"
                    maxlength="3"
                    placeholder="请输入"
                    on:input={() => handleEditInputEvent('height')}
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}

      <!--字符限制-->
      {#if paramType === 'text'}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">字符限制</label>
          <div class="uk-form-controls uk-margin-small-top">
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="number"
              name="maxLength"
              min="0"
              max="1000"
              bind:value={data.maxLength}
              on:change={() => handleEditChangeEvent('maxLength')}
              placeholder="请输入字符限制">
          </div>
        </div>
      {/if}

      <!--字体-->
      {#if isFontSet}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">字体</label>
          <div class="uk-form-controls uk-margin-small-top">
            <select
              class="uk-select uk-form-small uk-text-emphasis"
              name="fontFamily"
              bind:value={fontConfig.fontFamily}
              on:change={() => handleEditChangeEvent('fontFamily')}
            >
              <option value="none">请选择</option>
              {#each FONT_LISTS as item}
                <option value="{item.font.trim()}" style="font-family: {item.font}">{item.fontName}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}

      <!--字体大小-->
      {#if isFontSet}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">字体大小</label>
          <div class="uk-form-controls uk-margin-small-top">
            <select
              class="uk-select uk-form-small uk-text-emphasis"
              name="fontSize"
              bind:value={fontSize}
              on:change={() => handleEditChangeEvent('fontSize')}
            >
              <option value="none">请选择</option>
              {#each fontSizes as font}
                <option value={font}>{font}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}

      <!--字体粗细-->
      {#if isFontWeight}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">字体粗细</label>
          <div class="uk-form-controls uk-margin-small-top">
            <select
              class="uk-select uk-form-small uk-text-emphasis"
              name="fontWeight"
              bind:value={fontConfig.fontWeight}
              on:change={() => handleEditChangeEvent('fontWeight')}
            >
              {#each FONT_WEIGHT_OPTIONS as font}
                <option value="{font.value}">{font.label}</option>
              {/each}
            </select>
          </div>
        </div>
      {/if}

      <!--对齐方式-->
      {#if isAlignMent}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">对齐方式</label>
          <div class="uk-form-controls uk-margin-small-top">
            <ul class="uk-subnav uk-subnav-pill" uk-switcher>
              {#each ALIGNMENT_LIST as align}
                <li class:uk-active={align.value === fontConfig.justifyContent}
                    on:click={() => handleAlignment(align.value)}>
                  <a href={"javascript:void(0)"} name="justifyContent">{align.label}</a>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/if}

      <!--字体颜色-->
      {#if isFontSet}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">字体颜色</label>
          <div class="uk-form-controls uk-margin-small-top uk-width-1-4">
            <input
              class="uk-input"
              type="color"
              name="color"
              bind:value="{fontColor}"
              on:change={() => handleEditChangeEvent('color')}/>
          </div>
        </div>
      {/if}

      <!--选项设置-->
      {#if optionSet}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">选项设置</label>
          <div class="uk-form-controls uk-margin-small-top">
            {#each data.options as item, index}
              <div class="uk-flex uk-flex-align-items uk-margin-small-top">
                <input
                  class="uk-input uk-form-small pg-change-option-val"
                  type="text"
                  bind:value={item}
                  placeholder="请输入选项名称"
                  on:input={() => handleSetOptionItem(index)}
                />
                {#if index > 0}
                  <span
                    class="uk-icon-link cursor"
                    uk-icon="trash"
                    on:click={() => handleDeleteOptionsItem(index)}></span>
                {/if}
              </div>
            {/each}
          </div>
          <button
            class="uk-button uk-button-link uk-margin-small-top uk-flex uk-flex-align-items"
            on:click|preventDefault={handleAddOptionItem}>
            <i class="fa fa-plus add-option" aria-hidden="true"></i>
            <span>添加选项</span>
          </button>
        </div>
      {/if}

      <!--填写说明-->
      <div class="uk-margin">
        <label class="uk-form-label" for="">填写说明</label>
        <div class="uk-form-controls uk-margin-small-top">
          <textarea
            class="uk-textarea uk-text-emphasis"
            name="description"
            placeholder="对该参数的其他说明(限100字)"
            maxlength="100"
            bind:value={data.description}
            on:input={() => handleEditInputEvent('description')}
          />
        </div>
      </div>

      <!--是否必填-->
      {#if !tableDefault}
        <div class="uk-margin">
          <div class="uk-form-controls uk-margin-small-top">
            <label>
              <input
                class="uk-checkbox"
                type="checkbox"
                name="isRequired"
                bind:checked={data.isRequired}
                on:change={() => handleEditChangeEvent('isRequired')}>
              必填
            </label>
          </div>
        </div>
      {/if}

      <!--隐藏表头-->
      {#if tableDefault}
        <div class="uk-margin-small-top">
          <div class="uk-form-controls uk-margin-small-top">
            <label>
              <input
                class="uk-checkbox"
                type="checkbox"
                name="hideThead"
                bind:checked={data.hideThead}
                on:change={() => handleEditChangeEvent('hideThead')}>
              隐藏表头
            </label>
          </div>
        </div>
      {/if}

      <!--表头Key设置 暂时注释key的显示-->
      <!--{#if tableDefault && data.columnKeys}-->
      <!--  {#each data.columnKeys as column, index}-->
      <!--    <div class="uk-margin-small-top">-->
      <!--      <label class="uk-form-label" for="">第{index + 1}列Key：</label>-->
      <!--      <div class="uk-form-controls uk-margin-small-top">-->
      <!--        <input-->
      <!--          class="uk-input uk-form-small uk-text-emphasis"-->
      <!--          type="text"-->
      <!--          name="columnKeys"-->
      <!--          bind:value={column}-->
      <!--          on:input={handleUpdateColumnKey.bind(null, index)}-->
      <!--          placeholder="请输入">-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  {/each}-->
      <!--{/if}-->
    </div>

    <DatePicker
      target="#date-select"
      format={dateFormat}
      value={data.defaultValue}
      on:done={handleDateDone}
    />
  </Accordion>

  <Dialog
    message="初始值已超出字符限制，将删除多余部分，是否继续？"
    isCancel={false}
    buttonText="继续"
    id="maxLength"
    on:click={handleReplaceDefaultVal}
  />

</div>

<script>
  import {onDestroy, createEventDispatcher} from 'svelte';

  import initData from "@/utils/init-data";
  import {froalaStore, parametersStore} from "@/store/froala";
  // import {controlSizeWidthValid} from '@/utils/validation';
  import {colorHex, debounce, randomId, insertParameterVerify} from '@/utils';

  import * as parameters from '@/parameters';
  import underDescription from '@/parameters/under';
  import {PARAMETERS} from '@/config/parameter';
  import {tableRender} from '@/event/tableRender';
  import {
    FONT_LISTS,
    GET_BORDERS,
    ALIGNMENT_LIST,
    LAYOUT_OPTIONS,
    CONTROL_OPTIONS,
    FONT_SIZE_OPTIONS,
    FONT_WEIGHT_OPTIONS,
    DATE_FORMAT_OPTIONS,
  } from '@/config/parameter';

  import Dialog from '@/components/Base/dialog';
  import DatePicker from '@/components/Base/date-picker';
  import Accordion from '@/components/Base/Accordion/index.svelte';

  // 事件派发
  const dispatch = createEventDispatcher();

  // 获取froala实例
  let froala = null;
  const unsubscribe = froalaStore.subscribe(value => {
    froala = value;
  })

  // props
  export let paramId = null;
  // 记录参数名称count值
  let paramCount = 0;
  // 记录table参数名称值
  let tableCount = 0;

  $:isVisible = !!paramId;
  // 当前参数
  $:currentParameter = document.querySelector("[data-param-type][id=" + paramId + "]");
  // 参数类型
  let paramType = '';
  // store parameters
  $:parametersData = $parametersStore.data.parameters;

  /**
   * 参数编辑显示状态
   */
  // 默认值
  $:isDefaultValue = ['text'].includes(paramType);
  // 外观
  $:isStyle = ['text', 'radio', 'checkbox', 'date'].includes(paramType);
  // 控件大小
  $:isSize = ['text', 'date'].includes(paramType);
  // 字体-大小-颜色
  $:isFontSet = ['text', 'table', 'radio', 'checkbox', 'date', 'idcard'].includes(paramType);
  // 字体粗细
  $:isFontWeight = ['text', 'radio', 'checkbox', 'date', 'idcard'].includes(paramType);
  // 对齐方式
  $:isAlignMent = ['text', 'table', 'date'].includes(paramType);
  // 选项设置
  $:optionSet = ['radio', 'checkbox'].includes(paramType);

  // 身份证默认值
  $:idCardDefault = paramType === 'idcard';
  // table默认值
  $: tableDefault = paramType === 'table';
  // 日期默认值
  $:dateDefault = paramType === 'date';

  // 参数数据
  let data = {};
  // 字体配置
  let fontConfig = {};
  // 控件大小
  let size = {};
  // 日期格式
  let dateFormat = 'yyyy-MM-dd';

  // 控件大小-显示状态
  let sizeChecked = 'fixed';
  $:hidden = sizeChecked === 'customize' ? '' : 'hidden';
  // 字体大小
  $:fontSizes = FONT_SIZE_OPTIONS();
  let fontSize = 'none';
  // 字体颜色
  let fontColor = '';
  let freezeName = '';

  // 表格标题
  let tableTitle = '插入表格';
  let tableRow = null;
  let tableCol = null;

  $: if (paramId) {
    parametersStore.subscribe(params => {
      const parametersData = params.data.parameters;
      const res = params.data.parameters.find(item => item.id === paramId);

      // 重置参数记录值
      if (!parametersData.length) {
        tableCount = 0;
        paramCount = 0;
      }

      data = res || {};
      paramType = res?.paramType;
      freezeName = res?.name || '';

      if (JSON.stringify(res?.fontConfig) !== '{}') {
        fontConfig = res?.fontConfig;

        if (res?.fontConfig?.size) {
          size = res?.fontConfig?.size[1];
          sizeChecked = res?.fontConfig?.size[0];
        }

        fontSize = isNaN(Number(res?.fontConfig?.fontSize)) ? 'none' : Number(res?.fontConfig?.fontSize);
        fontColor = res?.fontConfig?.color ? colorHex(res?.fontConfig?.color) : '';
      }
    })
  }

  // 更新参数样式
  const updateParameterStyle = (styleName, value) => {
    currentParameter.style[styleName] = value;
  }
  // 更新参数属性
  const updateParameterAttr = (attrName, value) => {
    currentParameter.setAttribute(attrName, value);
  }

  // 参数编辑-input-event;
  const handleEditInputEvent = (attrName, event) => {
    if (['name', 'defaultValue'].includes(attrName)) {
      if (attrName === 'name') {
        if (event) {
          if (event.inputType !== 'deleteContentBackward') {
            freezeName = data[attrName];
          }
        }

        if (!data.name) {
          UIkit?.notification({
            message: '参数名称不能为空',
            status: 'danger',
            timeout: 2500,
          })
          setTimeout(() => {
            data.name = freezeName;
            updateParameterAttr('data-param-name', freezeName);
            parametersStore.updateData();
          }, 500)

          return;
        }

        updateParameterAttr('data-param-name', data[attrName]);
        parametersStore.updateData();
      }

      if (attrName === 'defaultValue') {
        currentParameter.innerHTML = data.defaultValue;
        updateParameterAttr('data-shadow-value', data.defaultValue);
      }
    }


    // 控件大小-自定义
    if (['width', 'height'].includes(attrName)) {
      if (size.width > 668) {
        size.width = 668;
        UIkit?.notification({
          message: '宽度必须小于668',
          status: 'danger',
          timeout: 2500,
        })
      }

      if (size.height > 200) {
        size.height = 200;
        UIkit?.notification({
          message: '高度必须小于200',
          status: 'danger',
          timeout: 2500,
        })
      }

      currentParameter.style.minWidth = size.width + 'px';
      currentParameter.style.minHeight = size.height + 'px';
    }
  }

  // 设置身份证默认值
  const handleEditIdCardInputEvent = () => {
    const Reg = /[^\d.|x|X]/g;
    const idCards = [...currentParameter.children];
    data.defaultValue = data.defaultValue.replace(Reg, '');

    const values = data.defaultValue.split('');
    idCards.forEach((node, index) => {
      node.innerHTML = values[index] || ''
      node.setAttribute('data-shadow-value', values[index] || '');
    })
  }

  // 日期默认值选择
  const handleDateDone = (event) => {
    const dateVal = event.detail;
    data.defaultValue = dateVal;

    currentParameter.innerHTML = dateVal;
    updateParameterAttr('data-shadow-value', dateVal);
  }

  // 切换日期格式
  const handleChangeDateFormat = () => {
    dateFormat = data.format;

    const defaultVal = data.defaultValue;
    const Reg_hor = /(.+?)\-(.+?)\-(.+)/, Reg_slash = /(.+?)\/(.+?)\/(.+)/, Reg_c = /[\u4e00-\u9fa5]/g;

    const format = {
      'yyyy年MM月dd日': () => {
        if (Reg_hor.test(defaultVal)) {
          data.defaultValue = defaultVal.replace(Reg_hor, "$1年$2月$3日");
        }
        if (Reg_slash.test(defaultVal)) {
          data.defaultValue = defaultVal.replace(Reg_slash, "$1年$2月$3日");
        }
      },
      'yyyy-MM-dd': () => {
        if (Reg_c.test(defaultVal)) {
          data.defaultValue = defaultVal.replace(Reg_c, (reg) => reg === '日' ? '' : '-');
        }

        if (Reg_slash.test(defaultVal)) {
          data.defaultValue = defaultVal.replace(Reg_slash, '$1-$2-$3');
        }
      },
      'yyyy/MM/dd': () => {
        if (Reg_hor.test(defaultVal)) {
          data.defaultValue = defaultVal.replace(Reg_hor, "$1/$2/$3");
        }

        if (Reg_c.test(defaultVal)) {
          data.defaultValue = defaultVal.replace(Reg_c, (reg) => reg === '日' ? '' : '/');
        }
      }
    }

    format[dateFormat] && format[dateFormat]();

    currentParameter.innerHTML = data.defaultValue;
    updateParameterAttr('data-shadow-value', data.defaultValue);
  }

  // 选择切换布局
  const changeLayout = () => {
    if (data.layout === 'dropdown') {
      currentParameter.innerHTML = '';
    } else {
      currentParameter.innerHTML = data?.options.reduce((prev, value) => {
        return prev + `<label><input type=${paramType} value="${value}" placeholder="请输入选项名称" onclick="return false;"><span class="pg-radio-label">${value}</span></label>`
      }, '');
    }
  }

  // 选择表格行列
  const handleMouseover = (row, col) => {
    tableTitle = `${row + 1} x ${col + 1}`;

    const tds = [...document.querySelector('#pg-table-selector-wrapper').children];

    tds.forEach(node => {
      const curRow = node.getAttribute('data-row'),
        curCol = node.getAttribute('data-col');

      if (curRow <= row && curCol <= col) {
        node.classList.add('is-active-col');
      } else {
        node.classList.remove('is-active-col');
      }
    })
  }

  // 校验自定行数
  const handleChangeTableRow = () => {
    if (tableRow < 1) {
      tableRow = 1;

      UIkit?.notification({
        message: '行最小为1',
        status: 'danger',
        timeout: 2500,
      })
    }
  }

  // 校验自定列数
  const handleChangeTableCol = () => {
    if (tableCol < 1) {
      tableCol = 1;
      UIkit?.notification({
        message: '列最小为1',
        status: 'danger',
        timeout: 2500,
      })
    }
    if (tableCol > 10) {
      tableCol = 10;
      UIkit?.notification({
        message: '列最大为10',
        status: 'danger',
        timeout: 2500,
      })
    }
  }

  const handleMouseLeave = () => {
    tableTitle = '插入表格';
    const tds = [...document.querySelector('#pg-table-selector-wrapper').children];
    tds.forEach((element) => element.classList.contains('is-active-col') && element.classList.remove('is-active-col'));
  }

  // 插入表格行列
  const handleInsertTable = (row, col) => {
    tableRow = row + 1;
    tableCol = col + 1;

    const verify = insertParameterVerify();
    if (!verify) {
      return UIkit?.notification({
        message: '参数内不允许插入参数',
        status: 'danger',
        timeout: 2500,
      })
    }

    tableCount++;
    const {template, id} = tableRender(tableRow, tableCol, `table${tableCount}`);

    froala.html.insert(template);
    dispatch('add', id);
  }

  // 自定义行列
  const handleCustomTableRowCol = async () => {
    tableCount++;
    const {template, id} = await tableRender(tableRow, tableCol, `table${tableCount}`);

    froala.html.insert(template);
    dispatch('add', id);

    setTimeout(() => {
      tableRow = null;
      tableCol = null;
    }, 300)
  }

  // 更新 column keys
  const handleUpdateColumnKey = (index) => {
    const froalaContainer = froala.$el[0];
    const table = froalaContainer.querySelector(`[id=${data.id}]`);
    const ths = [...table.querySelectorAll('th')];

    ths[index].setAttribute('data-pg-th', data.columnKeys[index]);
  }

  // 添加选项设置
  const handleAddOptionItem = () => {
    data.options = [...data.options, `选项${data.options.length + 1}`];

    changeLayout();
  }

  // 设置选项
  const handleSetOptionItem = () => {
    changeLayout();
  }

  // 删除选项设置
  const handleDeleteOptionsItem = (removeIndex) => {
    data.options = data.options.filter((item, index) => index !== removeIndex);
    changeLayout();
  }

  // 超出最大长度-更新默认值
  const handleReplaceDefaultVal = () => {
    data.defaultValue = String(data.defaultValue).substring(0, data.maxLength);

    handleEditInputEvent('defaultValue');
  }

  // 参数编辑-change-event;
  const handleEditChangeEvent = (attrName) => {
    const eventEnum = {
      // 外观
      'style': () => {
        updateParameterAttr('data-border-type', data.style);
      },
      // 控件大小
      'size': () => {
        if (sizeChecked === 'auto') {
          currentParameter.style.minWidth = 'auto';
          currentParameter.style.display = 'inline-flex';
        } else if (sizeChecked === 'fixed') {
          size.width = 148;
          size.height = 17;

          currentParameter.style.display = 'inline-flex';
          currentParameter.style.minWidth = '148px';
          currentParameter.style.minHeight = '17px';
        } else {
          currentParameter.style.minWidth = size.width + 'px';
          currentParameter.style.minHeight = size.height + 'px';
        }

        fontConfig.size = [sizeChecked, size];
      },
      // 布局
      'layout': () => {
        const layout = data.layout;
        updateParameterAttr('data-layout', layout);
        // 切换布局渲染数据
        changeLayout();
      },

      // 字符限制
      'maxLength': () => {
        // 限制默认值
        if (data.defaultValue.length > data.maxLength) {
          UIkit.modal('#maxLength').show();
        }

        updateParameterAttr('data-maxlength', data.maxLength);
      },
      // 字体
      'fontFamily': () => {
        updateParameterStyle('fontFamily', fontConfig.fontFamily);
      },
      // 字体大小
      'fontSize': () => {
        updateParameterStyle('fontSize', fontSize + 'px');

        fontConfig.fontSize = fontSize;
      },
      // 字体粗细
      'fontWeight': () => {
        updateParameterStyle('fontWeight', fontConfig.fontWeight)
      },
      // 字体颜色
      'color': () => {
        updateParameterStyle('color', fontColor);
        fontConfig.color = fontColor;
      },
      // 必填
      'isRequired': () => {
        parametersStore.updateData();
      },
      // 隐藏表头
      'hideThead': () => {
        const ths = document.querySelectorAll('[data-pg-th]');
        if (ths?.length) {
          ths.forEach(node => node.style.display = data.hideThead ? 'none' : '');
        }
      }
    }

    eventEnum[attrName] && eventEnum[attrName]();
  }

  // 对齐方式
  const handleAlignment = (value) => {
    updateParameterStyle('justifyContent', value);
    const textAlign = value === 'flex-end' ? 'right' : value === 'flex-start' ? 'left' : 'center';
    updateParameterStyle('textAlign', textAlign);

    fontConfig.justifyContent = value;
  }

  // 插入参数库模板
  const handleInsertParameter = debounce((paramType) => {
    const verify = insertParameterVerify();
    if (!verify) {
      return UIkit?.notification({
        message: '参数内不允许插入参数',
        status: 'danger',
        timeout: 2500,
      })
    }

    if (!$parametersStore.data.parameters.length) {
      paramCount = 0;
    }

    paramCount++;

    const id = randomId();
    const res = {...initData[paramType], name: `参数${paramCount}`, id};

    parametersStore.addData(res);
    froala.html.insert(parameters[paramType](res));

    defaultShowEdit(id);
  }, 300);


  // 默认值展开参数编辑
  const defaultShowEdit = (id) => {
    const froalaContainer = froala.$el[0];
    const parameter = froalaContainer.querySelector(`[data-param-type][id=${id}]`);

    dispatch('autoActive', parameter);
    // parameter.click();
  }


  onDestroy(unsubscribe);
</script>
