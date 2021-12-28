<div class="pg-container">
  {#if !options.isOff}
    <MakeTemplate/>
  {:else }
    <CompletionTemplate/>
  {/if}
</div>

<script>
  import {setContext} from 'svelte';
  import MakeTemplate from "./components/MakeTemplate/index.svelte";
  import CompletionTemplate from './components/Completion/index.svelte';

  // 获取传入的参数
  export let options;

  // 存储options参数
  setContext('optionsInfo', options);
</script>
