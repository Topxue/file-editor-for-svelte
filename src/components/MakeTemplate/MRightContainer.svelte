<div class="pg-html-panel-params">
  <Accordion title="参数库">
    <div class="pg-parameter-container">
      {#each PARAMETERS as params}
        <div
          class="pg-param-item"
          on:click={() => handleInsertParameter(params.type)}
        >
          <i class="{params.icon}"></i>
          <span>{params.label}</span>
        </div>
      {/each}
    </div>
  </Accordion>

  <Accordion title="参数编辑" visible="{isVisible}" disabled="{!isVisible}">
    <div class="pg-edit-item-wrapper">
      <!--参数名称-->
      <div>
        <label class="uk-form-label" for="">参数名称</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input
            class="uk-input uk-form-small uk-text-emphasis"
            type="text"
            name="name"
            placeholder="请输入参数名称"
            bind:value={data.name}
            on:input={() => handleEditInputEvent('name')}
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
              on:input={() => handleEditInputEvent('defaultValue')}
            >
          </div>
        </div>
      {/if}

      <!--日期默认值-->
      {#if isDateFormat}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">默认值</label>
          <div class="uk-form-controls uk-margin-small-top">
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              bind:value={data.defaultValue}
              name="defaultValue"
              placeholder="选择日期"
              readonly
            >
          </div>
        </div>
      {/if}

      <!--日期格式-->
      {#if isDateFormat}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">日期格式</label>
          <div class="uk-form-controls uk-margin-small-top">
            <select
              class="uk-select uk-form-small uk-text-emphasis"
              name="format"
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
                <span class:bottom={item.value === 'bottom'} class:borderAll={item.value === 'all'}>{item.label}</span>
              </label>
            {/each}
          </div>
        </div>
      {/if}

      <!--控件大小-->
      {#if isSize}
        <div class="uk-margin-small-top">
          <label class="uk-form-label" for="">控件大小</label>
          <div class="uk-form-controls uk-margin-small-top">
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
                    type="number"
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
                    type="number"
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
              on:change={() => handleEditChangeEvent('fontFamily')}
              bind:value={fontConfig.fontFamily}
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
          <div class="uk-form-controls uk-margin-small-top" id="pg-option-setting-wrapper">
            {#each options as item, index}
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
          <button class="uk-button uk-button-link uk-margin-small-top uk-flex" on:click={handleAddOptionItem}>
            <span uk-icon="plus"></span><span>添加选项</span>
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
            bind:value={data.description}
            on:input={() => handleEditInputEvent('description')}
          />
        </div>
      </div>

      <!--是否必填-->
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

    </div>
  </Accordion>
</div>

<script>
  import {onDestroy} from 'svelte';

  import db from "@/utils/db";
  import {colorHex} from '@/utils';
  import {froalaStore} from "@/store/froala";
  import * as parameters from '@/parameters';
  import {PARAMETERS} from '@/config/parameter';
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

  import Accordion from '@/components/Base/Accordion/index.svelte';

  // 获取froala实例
  let froala = null;
  const unsubscribe = froalaStore.subscribe(value => {
    froala = value;
  })

  // props
  export let paramId = null;
  $:isVisible = !!paramId;
  // 参数类型
  let paramType = '';

  /**
   * 参数编辑显示状态
   */
  // 默认值
  $:isDefaultValue = ['text', 'idcard'].includes(paramType);
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
  // 日期格式
  $:isDateFormat = paramType === 'date';

  // 参数数据
  let data = {};
  // 字体配置
  let fontConfig = {};
  // 控件大小
  let size = {};

  // 控件大小-显示状态
  let sizeChecked = 'fixed';
  $:hidden = sizeChecked === 'customize' ? '' : 'hidden';
  // 字体大小
  $:fontSizes = FONT_SIZE_OPTIONS();
  let fontSize = 'none';
  // 字体颜色
  let fontColor = '';
  // 选项设置-选项
  let options = [];

  // 当前参数
  $:currentParameter = document.querySelector("[data-param-type][id=" + paramId + "]");

  $: if (paramId) {
    db.getItem(paramId).then((res) => {
      data = res;
      options = res.options;
      paramType = res.paramType;

      if (JSON.stringify(res?.fontConfig) !== '{}') {
        fontConfig = res?.fontConfig;

        if (res?.fontConfig?.size) {
          size = res?.fontConfig?.size[1];
          sizeChecked = res?.fontConfig?.size[0];
          fontSize = isNaN(Number(res?.fontConfig?.fontSize)) ? 'none' : Number(res?.fontConfig?.fontSize);
        }

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
  const handleEditInputEvent = (attrName) => {
    if (['name', 'defaultValue'].includes(attrName)) {
      if (attrName === 'name') {
        updateParameterAttr('data-param-name', data[attrName]);
      }

      if (attrName === 'defaultValue') {
        currentParameter.innerHTML = data.defaultValue;
        updateParameterAttr('data-shadow-value', data.defaultValue);
      }

      db.setItem(data.id, {
        [attrName]: data[attrName]
      })
    }

    // 控件大小-自定义
    if (['width', 'height'].includes(attrName)) {
      currentParameter.style.width = size.width + 'px';
      currentParameter.style.height = size.height + 'px';

      db.setItem(data.id, {
        fontConfig: {
          size: [sizeChecked, {
            width: size.width,
            height: size.height
          }]
        }
      })
    }

    // 填写说明
    if (attrName === 'description') {
      db.setItem(data.id, {
        description: data.description
      })
    }
  }

  // 切换日期格式
  const handleChangeDateFormat = (event) => {
    const dateFormat = event.target.value;
    console.log(dateFormat, 'dateFormat...')
  }

  // 选择切换布局
  const changeLayout = () => {
    if (data.layout === 'dropdown') {
      currentParameter.innerHTML = '';
    } else {
      currentParameter.innerHTML = options.reduce((prev, value) => {
        return prev + `<label><input type="radio" value="${value}" placeholder="请输入选项名称" onclick="return false;"><span class="pg-radio-label">${value}</span></label>`
      }, '');
    }
  }

  // 添加选项设置
  const handleAddOptionItem = () => {
    options = [...options, '请输入选项名称'];
    db.setItem(data.id, {options});
    changeLayout();
  }

  // 设置选项
  const handleSetOptionItem = () => {
    db.setItem(data.id, {options});
    changeLayout();
  }

  // 删除选项设置
  const handleDeleteOptionsItem = (removeIndex) => {
    options = options.filter((item, index) => index !== removeIndex);
    db.setItem(data.id, {options});
    changeLayout();
  }


  // 参数编辑-change-event;
  const handleEditChangeEvent = (attrName) => {
    const eventEnum = {
      // 外观
      'style': () => {
        updateParameterAttr('data-border-type', data.style)
        db.setItem(data.id, {
          style: data.style
        })
      },
      // 控件大小
      'size': () => {
        if (sizeChecked === 'auto') {
          currentParameter.style.display = 'inline';
        } else if (sizeChecked === 'fixed') {
          currentParameter.style.display = 'inline-flex';
          currentParameter.style.width = '148px';
          currentParameter.style.height = '17px';
        } else {
          currentParameter.style.width = size.width + 'px';
          currentParameter.style.height = size.height + 'px';
        }
        db.setItem(data.id, {
          fontConfig: {
            size: [sizeChecked, {
              width: size.width,
              height: size.height
            }]
          }
        })
      },
      // 布局
      'layout': () => {
        const layout = data.layout;
        updateParameterAttr('data-layout', layout);
        db.setItem(data.id, {layout});
        // 切换布局渲染数据
        changeLayout();
      },

      // 字符限制
      'maxLength': () => {
        updateParameterAttr('data-maxlength', data.maxLength);
        db.setItem(data.id, {
          maxLength: data.maxLength
        })
      },
      // 字体
      'fontFamily': () => {
        updateParameterStyle('fontFamily', fontConfig.fontFamily);
        db.setItem(data.id, {
          fontConfig: {
            fontFamily: fontConfig.fontFamily
          }
        })
      },
      // 字体大小
      'fontSize': () => {
        updateParameterStyle('fontSize', fontSize + 'px');
        db.setItem(data.id, {
          fontConfig: {fontSize}
        })
      },
      // 字体粗细
      'fontWeight': () => {
        updateParameterStyle('fontWeight', fontConfig.fontWeight)
        db.setItem(data.id, {
          fontConfig: {
            fontWeight: fontConfig.fontWeight
          }
        })
      },
      // 字体颜色
      'color': () => {
        updateParameterStyle('color', fontColor);
        db.setItem(data.id, {
          fontConfig: {
            color: fontColor
          }
        })
      },
      // 必填
      'isRequired': () => {
        db.setItem(data.id, {
          isRequired: data.isRequired
        })
      }
    }

    eventEnum[attrName] && eventEnum[attrName]();
  }

  // 对齐方式
  const handleAlignment = (value) => {
    updateParameterStyle('justifyContent', value);
    const textAlign = value === 'flex-end' ? 'right' : value === 'flex-start' ? 'left' : 'center';
    updateParameterStyle('textAlign', textAlign);

    db.setItem(data.id, {
      fontConfig: {
        justifyContent: value
      }
    })
  }

  // 插入参数库模板
  const handleInsertParameter = async (paramType) => {
    const res = await db.addItem({paramType});
    froala.html.insert(await parameters[paramType](res?.target.result));
  }

  onDestroy(unsubscribe);
</script>
