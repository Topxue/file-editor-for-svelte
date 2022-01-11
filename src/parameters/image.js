/** Created by xwp on 2021-12-20 **/
import imageBg from '@/assets/image/image-bg.png'

export const image = (params) => {
  const {id, name} = params;

  return `<img class="pg-image-parameter" src="${imageBg}" data-param-type="image" data-param-name="${name}" style="width: 112px; height: 156px;padding: 1px;" id="${id}" alt="">&nbsp;`
}
