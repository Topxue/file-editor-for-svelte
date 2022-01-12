/** Created by xwp on 2021-12-13 **/

export const text = (data) => {
  const {id, defaultValue, style, name, maxLength} = data;

  return `<span
    contenteditable="false"
    class="fr-deletable pg-param-text pg-param-common"
    type="text"
    id="${id}"
    data-shadow-value="${defaultValue}"
    data-param-type="text"
    data-param-name="${name}"
    data-maxlength="${maxLength}"
    data-border-type="${style}"></span>&nbsp;`
}

