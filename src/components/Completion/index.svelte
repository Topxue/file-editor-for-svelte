<CHeader parametersData={parametersData} on:scroll={handleScroll}/>
<div class="pg-editor-body-container">
  <div style="width: 340px"></div>
  <!-- 编辑容器 -->
  <div id="pg-editor-container" class="pg-editor-container initiate-container"></div>
  <!--参数填写-->
  <FillParameter
    data={parametersData}
    paramId={paramId}
    freezeData={freezeData}
    on:check={handleClickFillIn}
    on:update={handleUpdateClick}
    on:required={getRequiredData}
  />
</div>

<!--下拉选择-->
<Select
  bind:value={optionVal}
  bind:data={optionData}
  visible={visible}
  multiple={multiple}
  on:select={handleSelected}
  target={target}
/>

<!--图片上传-->
<ImagePopup visible={imageVisible} target={target} on:upload={handleImageUpload}/>
<script>
  import {onDestroy, onMount, getContext} from "svelte";

  import CHeader from './CHeader.svelte';
  import Select from '@/components/Base/select';
  import FillParameter from './FillParameter.svelte';
  import ImagePopup from '@/components/Base/image-popup';

  import {froalaStore} from "@/store/froala";
  import {fillingConfig, PG_EDITOR_CONTAINER} from '@/config/froala';
  import {currentActiveParameter} from '@/event/viewEvent';

  // 获取外部传入的参数
  const params = getContext('optionsInfo');

  let freezeData = [];

  // 参数数据
  let parametersData = [];
  // 当前参数ID
  let paramId = null;
  let froalaContainer = null;

  // 上传图片 popup
  let imageVisible = false;

  // 是否多选
  let visible = false;
  let multiple = false
  let optionVal = [];
  let optionData = [];
  let target = null;

  // $:if (parametersData?.length) params?.getInitiate && params?.getInitiate(parametersData);

  onMount(async () => {
    await initFroala();
    initGlobeClickEvent();
  })

  // 初始化froala
  let froala = null;
  const initFroala = () => {
    froala = new FroalaEditor(PG_EDITOR_CONTAINER, {
      ...fillingConfig,
      events: {
        'initialized': () => {
          froala.edit.off();
          getParameterData();
        }
      }
    });
    froalaStore.set(froala);
    froalaContainer = froala.$el[0];
  }

  const initGlobeClickEvent = () => {
    // 注册全局事件
    froalaContainer.addEventListener('click', handleClickEditor);
    document.body.addEventListener('click', handlerBodyClick);
  }

  // 控制编辑器是否可编辑器
  const controlContenteditable = (target) => {
    if (!target) {
      froala.edit.off();
      return;
    }

    const paramType = target.getAttribute('data-param-type');
    const isEdit = ['table'].includes(paramType);
    if (isEdit) {
      froala.edit.on();
    } else {
      froala.edit.off();
    }
  }

  // 文本参数编辑事件
  const parameterChangeEvent = (event) => {
    const target = event.target;

    updateParameterData(target.innerHTML);
  }

  // 更新参数数据
  const updateParameterData = (value) => {
    const data = [...parametersData];
    const result = data.find(item => item.id === paramId);
    result.defaultValue = value;

    parametersData = data;
  }

  // 身份证参数编辑事件
  const parameterIdCardChangeEvent = (event) => {
    const key = event.key;
    const target = event.target;

    if (key !== 'Backspace' && key !== 'x' && key !== 'X' && !/^[0-9]*$/.test(key)) {
      target.innerHTML = '';
      return;
    }

    const setFilInInValue = () => {
      const value = [...target.parentNode.childNodes].reduce((prev, next) => {
        return prev + next.innerHTML;
      }, '') || '';

      updateParameterData(value);
    }

    setTimeout(() => {
      if (key === 'Backspace') {
        if (target.previousSibling) {
          target.previousSibling.focus();
          target.innerHTML = '';
          target.setAttribute('data-shadow-value', '');
        } else {
          target.innerHTML = '';
          target.setAttribute('data-shadow-value', '');
        }
        setFilInInValue();
        return;
      }

      if (target.innerHTML.length > 1) target.innerHTML = target.innerHTML[0];
      target.setAttribute('data-shadow-value', target.innerHTML);
      if (target.nextElementSibling) {
        target.nextElementSibling.focus();
      } else {
        target.blur()
      }
      setFilInInValue();
    }, 0);
  }

  // 控制参数编辑是否可编辑并注册编辑事件
  const controlParameterIsEdit = () => {
    const parameters = froalaContainer.querySelectorAll('[data-param-type]');
    parameters.forEach(node => {
      const paramType = node.getAttribute('data-param-type');
      if (paramType === 'text') {
        node.setAttribute('contenteditable', true);
        node.addEventListener('input', parameterChangeEvent)
      }

      if (paramType === 'idcard') {
        const idCards = [...node.children];
        idCards.forEach(elem => {
          elem.setAttribute('contenteditable', true);
          elem.addEventListener('keydown', parameterIdCardChangeEvent)
        })
      }

      const layout = node?.getAttribute('data-layout');
      if (paramType === 'radio' || paramType === 'checkbox' && layout !== 'dropdown') {
        const inputs = node.querySelectorAll('input');
        inputs.forEach(radio => {
          if (paramType === 'radio') {
            radio.addEventListener('click', handleChangeRadio.bind(null, inputs), false);
          } else {
            radio.addEventListener('click', handleChangeCheckbox.bind(null, inputs), false);
          }
        })
      }

      if (paramType === 'image') {
        node.addEventListener('click', handleUploadImage, false)
      }
    })
  }

  // 单选-no-dropdown
  const handleChangeRadio = (inputs, event) => {
    const value = event.target.value;
    inputs.forEach(node => {
      if (node.value === value) {
        node.checked = true
      } else {
        node.checked = false
      }
    })

    const parameter = froalaContainer.querySelector(`[id=${paramId}]`);

    const copyData = [...parametersData];
    const res = copyData.find(item => item.id === paramId);
    res.defaultValue = value;
    parameter.setAttribute('data-shadow-value', value);

    parametersData = copyData;
  }

  // 多选-no dropdown
  const handleChangeCheckbox = (inputs, event) => {
    const copyData = [...parametersData];
    const res = copyData.find(item => item.id === paramId);
    const target = event.target, value = target.value, isChecked = target.checked;
    const parameter = froalaContainer.querySelector(`[id=${paramId}]`);

    if (isChecked) {
      if (!res.defaultValue) res.defaultValue = [];
      res.defaultValue.push(value);
    } else {
      res.defaultValue = res.defaultValue.filter(item => item !== value);
    }

    parameter.setAttribute('data-shadow-value', res.defaultValue.join(','));

    parametersData = copyData;
  }

  // 图片上传
  const handleUploadImage = (event) => {
    target = event.target;
    imageVisible = true
  }

  const handleImageUpload = (event) => {
    const imgUrl = event.detail;

    const copyData = [...parametersData];
    const res = copyData.find(item => item.id === paramId);

    res.imgUrl = imgUrl;
    target.setAttribute('src', imgUrl);
    parametersData = copyData;
    imageVisible = false;
  }


  // 触发下拉选择显示隐藏
  const handleClickFillIn = (event) => {
    const {id, node} = event.detail;
    const param = parametersData.find(item => item.id === id);

    const paramType = param.paramType;
    if (['radio', 'checkbox'].includes(paramType)) {
      if (paramType === 'radio') {
        multiple = false;
      } else {
        multiple = true;
      }
      optionData = param.options;
      optionVal = param.defaultValue.split(',');

      if (node) target = node;

      setTimeout(() => {
        visible = !visible;
      }, 0);
    }
  }

  const handlerBodyClick = (event) => {
    const target = event.target;

    if (!target.classList.contains('option-item')) {
      visible = false;
    }

    if (target) {
      const paramType = target.getAttribute('data-param-type');
      if (paramType !== 'image') {
        imageVisible = false;
      }
    }
  }

  onDestroy(() => {
    document.body.removeEventListener('click', handlerBodyClick);
  })

  // 获取参数数据
  const getParameterData = () => {
    const data = params?.data;
    if (data) {
      parametersData = data.parameters;
      freezeData = [...data.parameters];
      froala.html.set(data.template || '');
    }

    controlParameterIsEdit();
  }

  // 编辑器点击事件
  const handleClickEditor = (event) => {
    const target = event.target.closest('[data-param-type]');
    paramId = target?.getAttribute('id');

    if (target) {
      const type = target.getAttribute('data-param-type'),
        layout = target.getAttribute('data-layout');

      if (['radio', 'checkbox'].includes(type) && layout === 'dropdown') {
        handleSelectEvent(target)
      }
    }

    controlContenteditable(target);
    currentActiveParameter(target);
  }

  // 下拉选择
  const handleSelectEvent = (parameterTarget) => {
    const res = parametersData.find(item => item.id === paramId);
    const paramType = res.paramType;

    if (['radio', 'checkbox'].includes(paramType)) {
      target = parameterTarget;

      optionData = res.options;
      optionVal = res.defaultValue && res.defaultValue.split(',');

      multiple = paramType === 'checkbox';

      setTimeout(() => {
        visible = !visible;
      }, 0);
    }
  }

  // 更新当前活动参数-联动
  const handleUpdateClick = ({detail}) => {
    paramId = detail;

    const froalaContainer = froala.$el[0];
    const target = froalaContainer.querySelector(`[id=${detail}]`)

    currentActiveParameter(target);
  }

  // 获取必填数据校验
  const getRequiredData = (event) => {
    parametersData = event.detail || [];
  }

  // 滚动到指定参数
  const handleScroll = (event) => {
    const id = event.detail;
    const target = froalaContainer.querySelector(`[id=${id}]`);

    paramId = id;
    currentActiveParameter(target);
  }

  // 更新参数
  const updateParameter = (parameter, value) => {
    if (!parameter) return;

    parameter.setAttribute('data-shadow-value', value);
    parameter.innerHTML = value;
  }

  // 选项选择
  const handleSelected = (event) => {
    const copyData = [...parametersData];
    const values = event.detail;

    const res = copyData.find(item => item.id === paramId);
    res.defaultValue = values.filter(item => item).join(',');

    optionVal = values;
    parametersData = copyData;
    // 更新参数
    const parameter = froalaContainer.querySelector(`[id=${paramId}]`);
    updateParameter(parameter, res.defaultValue);

    if (!multiple) {
      visible = false;
    }
  }

</script>
