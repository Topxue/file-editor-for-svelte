/** Created by xwp on 2021-11-15 **/

export const date = (data) => {
  const {id, defaultValue, style, name, format} = data;

  return `&nbsp;<span
    contenteditable="false"
    class="fr-deletable pg-param-text pg-param-common"
    type="text"
    id="${id}"
    data-shadow-value="${defaultValue}"
    data-param-type="date"
    data-param-name="${name}"
    format-type="${format}"
    data-border-type="${style}"></span>&nbsp;`
}

