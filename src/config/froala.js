/** Created by xwp on 2021-12-16 **/

/**
 *编辑器容器ID
 * @type {string}
 */
export const PG_EDITOR_CONTAINER = '#pg-editor-container';

/**
 * 模板编辑器配置
 */
export const editorConfig = {
  height: 810,
  language: 'zh_cn',
  disabled: true,
  toolbarContainer: '#pg-toolbar-container',
  toolbarButtons: [
    'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
    'insertTable', 'insertImage', 'insertHR'
  ],
  tableEditButtons: ['tableRemove', '|', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign'],
  // 删除时保留所选文本格式
  // keepFormatOnDelete: true,
  htmlAllowedEmptyTags: ['p', 'span', 'image'],
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
}

/**
 * 填充编辑器配置
 */
export const fillingConfig = {
  height: 840,
  language: 'zh_cn',
  toolbarContainer: '#pg-toolbar-container',
  htmlAllowedEmptyTags: ['p', 'span', 'image'],
  tableEditButtons: ['tableRows'],
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
}
