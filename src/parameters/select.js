/**
 * @description select 单选
 * @author PG
 * @createTime  2021-11-15
 */

const select = (params) => {
  const {id, style, name, layout} = params;

  return `&nbsp;<span
    contenteditable="false"
    class="fr-deletable pg-param-text pg-param-common"
    type="text"
    id="${id}"
    data-layout="${layout}"
    data-param-type="radio"
    data-param-name="${name}"
    data-border-type="${style}"></span>&nbsp;`
}


export {
  select as radio
}
