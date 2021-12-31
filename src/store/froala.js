/** Created by xwp on 2021-12-13 **/
import {writable} from 'svelte/store';

function createFroalaStore() {
  const {subscribe, set} = writable(null);

  return {
    subscribe,
    set: (froala) => set(froala),
    // get: () =>
  };
}

export const froalaStore = createFroalaStore();

// 参数store
// export const parametersStore = writable({
//   template: '',
//   parameters: []
// });

// export const parametersStore = writable({
//   template: '',
//   parameters: []
// });

function createParametersStore(defaultVal) {
  const {subscribe, set, update} = writable(defaultVal);

  return {
    subscribe,
    // 添加参数数据
    addData: (item) => {
      update(param => param.parameters = param.parameters.push(item));
    },
    reset: () => {
      set({
        template: '',
        parameters: []
      })
    }
  }
}

export const parametersStore = createParametersStore({
  template: '',
  parameters: []
});
