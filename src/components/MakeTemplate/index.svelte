<MHeader/>
<div id="pg-toolbar-container"></div>
<div class="pg-editor-body-container">
  <!--  窗格参数-->
  <MLeftContainer/>
  <!-- 编辑容器 -->
  <div id="pg-editor-container" class="pg-editor-container"></div>
  <!-- 参数设置 -->
  <MRightContainer paramId={paramId}/>
</div>


<script>
  import {onMount} from 'svelte';
  // import FroalaEditor from 'froala-editor';

  import {froalaStore} from "@/store/froala";
  import {editorConfig} from '@/config/froala';
  import {currentActiveParameter} from '@/event/viewEvent';

  import MHeader from './MHeader.svelte';
  import MLeftContainer from './MLeftContainer.svelte';
  import MRightContainer from './MRightContainer.svelte';

  // 当前参数id
  let paramId = null;

  // 编辑器实例
  let froala = null;
  onMount(() => {
    froala = new FroalaEditor('#pg-editor-container', {
      ...editorConfig,
      events: {
        'click': (clickEvent) => {
          handleClickEditor(clickEvent);
        }
      }
    });

    froalaStore.set(froala);
  })


  const handleClickEditor = (event) => {
    const target = event.target.closest('[data-param-type]');
    paramId = target?.getAttribute('id');
    // 当前活动参数
    currentActiveParameter(target);
  }
</script>
