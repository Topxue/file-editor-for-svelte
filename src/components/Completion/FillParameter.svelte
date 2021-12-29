<div class="fill-in-container">
  <ul uk-tab uk-sticky>
    <li class="uk-active"><a href={"javascript:void(0)"}>参数填写<sup class="uk-badge">{data?.length || 0}</sup></a></li>
  </ul>
  <form class="uk-form-stacked uk-margin">
    <div class="uk-form-controls uk-flex uk-flex-right">
      <label class="uk-margin-small-right"><input class="uk-checkbox" type="checkbox" bind:checked={isRequired}
                                                  on:change={handleIsRequired}>
        仅看必填</label>
      <label><input class="uk-checkbox" type="checkbox" bind:checked={isOnlyWrite}> 仅看待我填写</label>
    </div>
    {#each data as param, index}
      <!--文本-->
      {#if param.paramType === 'text'}
        <div class="uk-margin" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              name="{param.paramType}"
              bind:value="{param.defaultValue}"
              placeholder="请输入"
              on:input={() => handleEditInputEvent(param.paramType, index)}
            >
          </div>
        </div>
      {/if}

      <!-- 表格-->
      {#if param.paramType === 'table'}
        <div
          class="uk-margin"
          on:click={() => handleClickFillIn(param)}
        >
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <div class="uk-text-muted trip-text">请在正文中填写</div>
          </div>
        </div>
      {/if}

      <!--图片-->
      {#if param.paramType === 'image'}
        <div class="uk-margin" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls upload-wrapper uk-inline uk-width-1-1">
            {#if param.imgUrl}
              <button
                class="uk-button uk-button-small uk-button-default remove-image-btn"
                on:click|preventDefault|stopPropagation={() => handleRemoveImage(param.id)}>
                删除
              </button>
            {/if}
            <div uk-form-custom class="uk-width-1-1">
              {#if param.imgUrl}
                <div class="image-upload-container">

                  <div class="image-container">
                    <img src={param.imgUrl} alt="">
                  </div>
                  <div class="button-container">
                    <input
                      type="file"
                      accept="image/jpeg, image/jpg, image/png, image/gif"
                      on:change={handleUploadImage}>
                    <button class="uk-button uk-button-small uk-button-primary reset-upload-btn">重新上传</button>
                  </div>
                </div>
              {:else }
                <input type="file" accept="image/jpeg, image/jpg, image/png, image/gif" on:change={handleUploadImage}>
                <button class="uk-button uk-button-small uk-button-default uk-width-1-1" type="button" tabindex="-1">
                  点击上传
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/if}

      <!--单选-->
      {#if param.paramType === 'radio'}
        <div class="uk-margin" on:click={(event) => handleClickFillIn(param, event)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls uk-inline uk-width-1-1" class:margin-btm={param.layout !== 'dropdown'}>
            {#if param.layout === 'dropdown'}
              <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
              <input
                class="uk-input uk-form-small uk-text-emphasis"
                type="text"
                placeholder="请选择"
                name="{param.paramType}"
                bind:value="{param.defaultValue}"
                readonly
              >
            {:else }
              {#each param.options as item}
                <label>
                  <input
                    class="uk-radio"
                    type="radio"
                    name={param.id}
                    value={item}
                    bind:group={param.defaultValue}
                    on:change={() => handleChangeRadio(item)}
                  > {item}
                </label>
              {/each}
            {/if}
          </div>
        </div>
      {/if}

      <!--多选-->
      {#if param.paramType === 'checkbox'}
        <div class="uk-margin" on:click={(event) => handleClickFillIn(param, event)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls uk-inline uk-width-1-1" class:margin-btm={param.layout !== 'dropdown'}>
            {#if param.layout === 'dropdown'}
              <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
              <input
                class="uk-input uk-form-small uk-text-emphasis"
                type="text"
                name="{param.paramType}"
                bind:value="{param.defaultValue}"
                readonly
                placeholder="请输入">
            {:else }
              {#each param.options as item}
                <label>
                  <input
                    class="uk-checkbox"
                    type="checkbox"
                    name={param.id}
                    value={item}
                    bind:group={param.defaultValue}
                    on:change={() => handleChangeCheckbox(param)}
                  > {item}
                </label>
              {/each}
            {/if}
          </div>
        </div>
      {/if}

      <!--日期-->
      {#if param.paramType === 'date'}
        <div class="uk-margin" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
            <DateInput
              format={param.format}
              placeholder="选择日期"
              bind:value={param.defaultValue}
              on:select={handleChangeDate.bind(null, param.paramType, index)}
              locale={localeFromDateFnsLocale(zhCN)}
            />
          </div>
        </div>
      {/if}

      <!--身份证-->
      {#if param.paramType === 'idcard'}
        <div class="uk-margin" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              maxlength="18"
              name="idcard"
              bind:value="{param.defaultValue}"
              on:keyup={fillInIdCardKeyupEvent.bind(null,param.paramType, index) }
              placeholder="请输入"/>
          </div>
        </div>
      {/if}
    {/each}
  </form>
</div>
<script>
  import {onMount, createEventDispatcher} from "svelte";

  import zhCN from 'date-fns/locale/zh-CN';
  import {ICON_ENUM, defaultImageBg} from '@/config/parameter';
  import {DateInput, localeFromDateFnsLocale} from '@/components/Base/date-picker-svelte';

  // 参数数据
  export let data = [];
  export let paramId = null;

  // 仅看必填
  let isRequired = false;
  // 仅看待我填写
  let isOnlyWrite = true;
  // 当前活动参数类型
  let froalaContainer = null;
  // 事件派发
  const dispatch = createEventDispatcher();

  onMount(() => {
    froalaContainer = document.querySelector('#pg-editor-container');
  })

  // 更新参数
  const updateParameter = (parameter, value) => {
    if (!parameter) return;
    parameter.setAttribute('data-shadow-value', value);
    parameter.innerHTML = value;
  }

  const handleClickFillIn = (param, event) => {
    dispatch('update', param.id);
    // 单选多选事件派发
    if (['radio', 'checkbox'].includes(param.paramType) && param.layout === 'dropdown') {
      dispatch('check', {id: param.id, node: event.target.closest('input')});
    }
  }

  // 仅看必填
  const handleIsRequired = () => {
    console.log(isRequired)
  }

  // 参数填充-input-event;
  const handleEditInputEvent = (paramType, index) => {
    const value = data[index].defaultValue;
    const parameter = froalaContainer.querySelector(`[data-param-type=${paramType}][id=${paramId}]`);

    // 文本参数填充
    if (paramType === 'text') {
      updateParameter(parameter, value);
    }
  }
  // 身份证填充
  const fillInIdCardKeyupEvent = (paramType, index, event) => {
    const key = event.key;
    if (key !== 'Backspace' && key !== 'x' && key !== 'X' && !/^[0-9]*$/.test(key)) return;

    const value = data[index].defaultValue;
    const parameter = froalaContainer.querySelector(`[data-param-type=${paramType}][id=${paramId}]`);

    const childArr = [...parameter.children];
    const valArr = value.split('');

    childArr.forEach((node, index) => node.innerHTML = valArr[index] || '');
  }

  // 日期选择
  const handleChangeDate = (paramType, index, event) => {
    const parameter = froalaContainer.querySelector(`[data-param-type=${paramType}][id=${paramId}]`);
    updateParameter(parameter, event.detail);
  }

  //  图片上传
  const handleUploadImage = (event) => {
    const target = event.target;
    const file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (result) => {
      const url = result.target.result;

      updateImageData(url)
    };
  }

  // 获取其他节点
  const getSiblings = (node) => {
    return Array.from(node.parentNode.parentNode.children).filter(n => n !== node)
  }

  // 单选选择-no dropdown
  const handleChangeRadio = (value) => {
    const parameter = froalaContainer.querySelector(`[data-param-type=radio][id=${paramId}]`);
    const inputs = parameter.querySelectorAll('input');
    inputs.forEach(node => {
      const nodeVal = node.value;
      if (nodeVal === value) {
        node.checked = true;
        parameter.setAttribute('data-shadow-value', value);
      } else {
        node.checked = false;
      }
    })
  }

  // 多选选择-no dropdown
  const handleChangeCheckbox = (param) => {
    const values = param.defaultValue;

    const parameter = froalaContainer.querySelector(`[data-param-type=checkbox][id=${paramId}]`);
    const inputs = parameter.querySelectorAll('input');
    inputs.forEach(node => {
      const nodeVal = node.value;
      if (values.includes(nodeVal)) {
        node.checked = true;
      } else {
        node.checked = false;
      }
    });

    parameter.setAttribute('data-shadow-value', values.join(','));
  }

  // 更新图片参数跟数据
  const updateImageData = (url) => {
    const copyData = [...data];
    const res = copyData.find(item => item.id === paramId);
    res.imgUrl = url;
    data = copyData;

    // 更新参数
    const parameter = froalaContainer.querySelector(`[data-param-type=image][id=${paramId}]`);
    parameter.setAttribute('src', url);
  }

  const handleRemoveImage = (id) => {
    const copyData = [...data];
    const res = copyData.find(item => item.id === id);
    res.imgUrl = '';

    // 更新参数
    const parameter = froalaContainer.querySelector(`[data-param-type=image][id=${id}]`);
    parameter.setAttribute('src', defaultImageBg);

    data = copyData;
  }

</script>
<style>
    .margin-btm {
        line-height: 23px;
        display: flex;
        flex-direction: column;
    }

    .upload-wrapper {
        position: relative;
    }

    .image-upload-container {
        text-align: center;
    }

    .image-container {
        height: 180px;
        border: 1px solid #e5e7ea;
        border-radius: 4px;
        padding: 3px;
        box-sizing: border-box;
    }

    .button-container {
        display: flex;
        justify-content: flex-end;
    }

    .button-container button {
        width: 121px;
        margin-right: 18px;
    }

    .remove-image-btn, .reset-upload-btn {
        width: 121px;
    }

    .remove-image-btn {
        position: absolute;
        left: 18px;
        bottom: 0;
        z-index: 99;
    }

    .reset-upload-btn {
        margin-top: 10px;
    }

    .image-container img {
        object-fit: cover;
        max-width: 100%;
        height: 100%;
        vertical-align: middle;
        border: 0;
    }
</style>

