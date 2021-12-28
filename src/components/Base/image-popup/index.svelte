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

<style>
    .pg-image-popup-container {
        display: none;
    }

    .image-popup-container {
        width: 320px;
        max-width: 320px;
        height: 120px;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 1px 1px rgba(0, 0, 0, 0.16);
        border-radius: 2px;
        box-sizing: border-box;
        user-select: none;
        margin-top: 10px;
        border-top: 5px solid #222;
        position: fixed;
        z-index: 999;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    .is-visible {
        display: inline-block;
    }

    .fr-arrow {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #222;
        position: absolute;
        top: -9px;
        left: 50%;
        margin-left: -5px;
        display: inline-block;
    }

    .upload-wrapper {
        cursor: pointer;
        width: 100%;
        position: relative;
    }

    .upload-wrapper input {
        cursor: pointer;
    }

    .uk-form-custom {
        width: 320px;
        height: 95px;
        cursor: pointer;
        line-height: 100px;
        border: 2px dashed #e5e5e5;
        position: relative;
    }

</style>
