/** Created by xwp on 2021-12-16 **/

export const currentActiveParameter = (target) => {
  const froalaContainer = document.querySelector('#pg-editor-container');
  const parameters = froalaContainer.querySelectorAll('[data-param-type]');

  const siblings = Array.from(parameters).filter(n => n !== target).filter(element => {
    if (element.getAttribute('data-param-type')) {
      return element;
    }
  });

  const isParamType = target?.getAttribute('data-param-type');

  if (isParamType) {
    target.classList.add('is-active');
  }

  if (siblings?.length) {
    siblings.forEach(element => element.classList.remove('is-active'));
  }
}
