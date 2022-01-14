<div class="fill-in-container">
  <ul uk-tab uk-sticky>
    <li class="uk-active"><a href={"javascript:void(0)"}>参数填写<sup class="uk-badge">{data.length || 0}</sup></a></li>
  </ul>
  <form class="uk-form-stacked uk-margin">
    <div class="uk-form-controls uk-flex uk-flex-right">
      <label class="uk-margin-small-right">
        <input
          class="uk-checkbox"
          type="checkbox"
          bind:checked={isRequired}
          on:change={handleIsRequired}>
        仅看必填
      </label>
      <!--<label><input class="uk-checkbox" type="checkbox" bind:checked={isOnlyWrite}> 仅看待我填写</label>-->
    </div>
    {#each data as param, index}
      <!--文本-->
      {#if param.paramType === 'text'}
        <a class="uk-margin uk-scroll-a" uk-scroll href="#{param.id}" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          {#if param.description}
            <div class="completion-content uk-text-muted">
              <i class="fa fa fa-exclamation-circle"
                 uk-tooltip="title: 填写说明; delay: 500"></i>
              <span>{param.description}</span>
            </div>
          {/if}
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              name="{param.paramType}"
              bind:value="{param.defaultValue}"
              maxlength={param.maxLength}
              placeholder="请输入"
              on:input={() => handleEditInputEvent(param.paramType, index)}
            >
          </div>
        </a>
      {/if}
      <!--日期-->
      <!--{#if param.paramType === 'date'}-->
      <!--  <a class="uk-margin uk-scroll-a" uk-scroll href="#{param.id}" on:click={() => handleClickFillIn(param)}>-->
      <!--    <label-->
      <!--      class="uk-form-label"-->
      <!--      class:is-required={param.isRequired}-->
      <!--      class:is-active={param.id === paramId}-->
      <!--      for="">{param.name}</label>-->
      <!--    {#if param.description}-->
      <!--      <div class="completion-content uk-text-muted">-->
      <!--        <i class="fa fa fa-exclamation-circle"-->
      <!--           uk-tooltip="title: 填写说明; delay: 500"></i>-->
      <!--        <span>{param.description}</span>-->
      <!--      </div>-->
      <!--    {/if}-->
      <!--    <div class="uk-form-controls uk-inline uk-width-1-1">-->
      <!--      <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>-->
      <!--      <input-->
      <!--        class="uk-input uk-form-small uk-text-emphasis"-->
      <!--        type="text"-->
      <!--        name="{param.paramType}"-->
      <!--        bind:value="{param.defaultValue}"-->
      <!--        maxlength={param.maxLength}-->
      <!--        placeholder="请选择"-->
      <!--        readonly-->
      <!--      >-->
      <!--    </div>-->
      <!--  </a>-->
      <!--{/if}-->

      <!-- 表格-->
      {#if param.paramType === 'table'}
        <a
          class="uk-margin uk-scroll-a" uk-scroll href="#{param.id}"
          on:click={() => handleClickFillIn(param)}
        >
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          {#if param.description}
            <div class="completion-content uk-text-muted">
              <i class="fa fa fa-exclamation-circle"
                 uk-tooltip="title: 填写说明; delay: 500"></i>
              <span>{param.description}</span>
            </div>
          {/if}
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <div class="uk-text-muted trip-text">请在正文中填写</div>
          </div>
        </a>
      {/if}

      <!--图片-->
      {#if param.paramType === 'image'}
        <div class="uk-margin" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          {#if param.description}
            <div class="completion-content uk-text-muted">
              <i class="fa fa-exclamation-circle"
                 uk-tooltip="title: 填写说明; delay: 500">
              </i>
              <span>{param.description}</span>
            </div>
          {/if}
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
          <a class="uk-scroll-a" uk-scroll href="#{param.id}">
            <label
              class="uk-form-label"
              class:is-required={param.isRequired}
              class:is-active={param.id === paramId}
              for="">{param.name}</label>
          </a>
          {#if param.description}
            <div class="completion-content uk-text-muted">
              <i class="fa fa fa-exclamation-circle"
                 uk-tooltip="title: 填写说明; delay: 500"></i>
              <span>{param.description}</span>
            </div>
          {/if}
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
          <a class="uk-scroll-a" uk-scroll href="#{param.id}">
            <label
              class="uk-form-label"
              class:is-required={param.isRequired}
              class:is-active={param.id === paramId}
              for="">{param.name}</label>
          </a>
          {#if param.description}
            <div class="completion-content uk-text-muted">
              <i class="fa fa fa-exclamation-circle"
                 uk-tooltip="title: 填写说明; delay: 500"></i>
              <span>{param.description}</span>
            </div>
          {/if}
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

      <!--身份证-->
      {#if param.paramType === 'idcard'}
        <a class="uk-margin uk-scroll-a" uk-scroll href="#{param.id}" on:click={() => handleClickFillIn(param)}>
          <label
            class="uk-form-label"
            class:is-required={param.isRequired}
            class:is-active={param.id === paramId}
            for="">{param.name}</label>
          {#if param.description}
            <div class="completion-content uk-text-muted">
              <i class="fa fa fa-exclamation-circle"
                 uk-tooltip="title: 填写说明; delay: 500"></i>
              <span>{param.description}</span>
            </div>
          {/if}
          <div class="uk-form-controls uk-inline uk-width-1-1">
            <i class="uk-form-icon {ICON_ENUM[param.paramType]}"></i>
            <input
              class="uk-input uk-form-small uk-text-emphasis"
              type="text"
              maxlength="18"
              name="idcard"
              bind:value="{param.defaultValue}"
              on:input={fillInIdCardKeyupEvent.bind(null,param.paramType, index) }
              placeholder="请输入"/>
          </div>
        </a>
      {/if}
    {/each}
  </form>
</div>
<script>
  import {onMount, createEventDispatcher} from "svelte";
  import {ICON_ENUM, defaultImageBg} from '@/config/parameter';

  // 参数数据
  export let data = [];
  export let paramId = null;
  export let freezeData = [];

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
    if (isRequired) {
      data = freezeData.filter(item => item.isRequired)
    } else {
      data = freezeData;
    }
  }

  // 参数填充-input-event;
  const handleEditInputEvent = (paramType, index) => {
    const value = data[index].defaultValue;
    const parameter = froalaContainer.querySelector(`[data-param-type=${paramType}][id=${paramId}]`);

    // 文本参数填充
    if (paramType === 'text') {
      updateParameter(parameter, value);
    }
    dispatch('required', data);
  }

  // 身份证填充
  const fillInIdCardKeyupEvent = (paramType, index) => {
    const Reg = /[^\d.|x|X]/g;
    const parameter = froalaContainer.querySelector(`[data-param-type=${paramType}][id=${paramId}]`);
    const idCards = [...parameter.children];

    data[index].defaultValue = data[index].defaultValue.replace(Reg, '');

    const values = data[index].defaultValue.split('');
    idCards.forEach((node, index) => {
      node.innerHTML = values[index] || ''
      node.setAttribute('data-shadow-value', values[index] || '');
    })

    dispatch('required', data);
  }

  //  图片上传
  const handleUploadImage = (event) => {
    const target = event.target;
    const file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (result) => {
      const url = result.target.result;

      updateImageData(url);
    };
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

    dispatch('required', data);
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

    dispatch('required', data);
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

    dispatch('required', data);
  }

  const handleRemoveImage = (id) => {
    const copyData = [...data];
    const res = copyData.find(item => item.id === id);
    res.imgUrl = '';

    // 更新参数
    const parameter = froalaContainer.querySelector(`[data-param-type=image][id=${id}]`);
    parameter.setAttribute('src', defaultImageBg);

    data = copyData;

    dispatch('required', data);
  }

</script>

