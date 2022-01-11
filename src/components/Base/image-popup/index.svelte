<div class:is-visible={visible} class="pg-image-popup-container">
  <div class="image-popup-container" style="top:{style.top}; left:{style.left}" on:click|stopPropagation>
    <div class="fr-arrow"></div>
    <div uk-form-custom class="uk-form-custom upload-wrapper uk-text-center">
      <input type="file" accept="image/jpeg, image/jpg, image/png, image/gif" on:change={handleChangeImage}>
      <span class="uk-link">选择图片上传</span>
    </div>
  </div>
</div>


<script>
  import {createEventDispatcher} from 'svelte';

  export let visible = false;
  export let target = null;

  //事件派发
  const dispatch = createEventDispatcher();

  let style = {};

  $: {
    if (target) {
      const {top, left} = target.getBoundingClientRect();
      const domH = +window.getComputedStyle(target).height.split('px')[0],
        domW = +window.getComputedStyle(target).width.split('px')[0];

      style = {
        left: left - domW + 'px',
        top: top + domH + 'px'
      }
    }
  }

  const handleChangeImage = (event) => {
    const target = event.target;
    const file = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (result) => {
      const url = result.target.result;

      dispatch('upload', url);
    };
  }
</script>
