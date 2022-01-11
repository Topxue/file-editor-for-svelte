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
  width: 810,
  height: 810,
  language: 'zh_cn',
  autofocus: true,
  // htmlExecuteScripts: true,
  placeholderText: '请输入内容',
  lineBreakerTags: ['table', 'hr', 'p'],
  htmlUntouched: true,
  toolbarButtons: [
    'undo', 'redo', 'clearFormatting', '|',
    'paragraphFormat', 'fontFamily', 'fontSize', '|',
    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'textColor', '|',
    'alignJustify', 'alignLeft', 'alignCenter', 'alignRight', 'lineHeight', 'outdent', 'indent', '|',
    'insertImage', 'insertHR', 'insertTable', 'selectAll'],
  tableEditButtons: ['tableRemove', '|', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign'],

  // 删除时保留所选文本格式
  // keepFormatOnDelete: true,
  htmlAllowedEmptyTags: ['p', 'span', 'image', 'br'],
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
}

/**
 * 填充编辑器配置
 */
export const fillingConfig = {
  height: 810,
  language: 'zh_cn',
  // toolbarContainer: '#pg-toolbar-container',
  htmlAllowedEmptyTags: ['p', 'span', 'image'],
  tableEditButtons: ['tableRows'],
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
}
