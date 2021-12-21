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

export const parameters = writable({});
