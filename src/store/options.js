/** Created by xwp on 2021-12-10 **/
import {writable} from 'svelte/store';

/**
 * 获取传入的参数
 */
const getOptions = () => {
  const {subscribe, set} = writable(null);

  return {
    subscribe,
    set: value => set(value),
    reset: () => set(null),
  }
}

export const setOptions = getOptions();
