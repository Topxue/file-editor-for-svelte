/** Created by xwp on 2021-12-16 **/

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
