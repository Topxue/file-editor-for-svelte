/** Created by xwp on 2021-12-13 **/
import {deepClone} from '../utils/index';

import {writable} from 'svelte/store';

function createFroalaStore() {
  const {subscribe, set} = writable(null);

  return {
    subscribe,
    set: (froala) => set(froala),
  };
}

export const froalaStore = createFroalaStore();

const defaultOption = {
  target: null,
  isOff: false,
  data: {
    template: '',
    parameters: []
  }
}

let freezeData = [];

function createParametersStore(defaultVal) {
  const {subscribe, set, update} = writable(defaultVal);

  return {
    subscribe,
    getFreezeData: () => {
      return freezeData;
    },
    // 添加参数数据
    addData: (item) => update(param => {
      const deepCloneItem = deepClone(item);
      freezeData?.push(deepCloneItem);

      const parameters = [...param.data.parameters];
      const isExist = parameters.find(res => res.id === item.id);
      if (!isExist) parameters.push(deepCloneItem);

      return {
        ...param,
        data: {
          ...param.data,
          parameters
        }
      }
    }),

    updateData: () => update(param => param),

    updateParameters: (parameters) => update(param => {
      return {
        ...param,
        data: {
          ...param.data,
          parameters
        }
      }
    }),

    deleteItem: (id) => update(param => {
      return {
        ...param,
        data: {
          ...param.data,
          parameters: param.data.parameters.filter(item => item.id !== id)
        }
      }
    }),

    // 初始化store数据
    setData: (data) => {
      freezeData = data?.data?.parameters || [];
      set(data);
    },

    // 重置
    reset: () => {
      set(defaultOption)
    }
  }
}

export const parametersStore = createParametersStore(defaultOption);
