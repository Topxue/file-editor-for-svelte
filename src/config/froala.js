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
  // lineBreakerTags: ['table', 'hr', 'p'],
  htmlUntouched: true,
  fontFamily: {
    'SimHei, STHeiti, BASE': '黑体',
    'Microsoft YaHei, STXihei, Simhei, BASE': '微软雅黑',
    'SimSun, STSong, BASE': '宋体',
    'FangSong, STFangsong, BASE': '仿宋',
    'KaiTi, STKaiti, BASE': '楷体',
    'Arial,Helvetica,sans-serif': 'Arial',
    'Georgia,serif': 'Georgia',
    'Impact,Charcoal,sans-serif': 'Impact',
    'Tahoma,Geneva,sans-serif': 'Tahoma',
    "'Times New Roman',Times,serif": 'Times New Roman',
    'Verdana,Geneva,sans-serif': 'Verdana'
  },
  toolbarButtons: [
    'undo', 'redo', 'clearFormatting', '|',
    'paragraphFormat', 'fontFamily', 'fontSize', '|',
    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'textColor', '|',
    'alignJustify', 'alignLeft', 'alignCenter', 'alignRight', 'lineHeight', 'outdent', 'indent', '|',
    'insertHR', 'insertTable', 'selectAll'],
  tableMultipleStyles: false,
  tableEditButtons: ['tableRemove', '|', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign'],
  tableStyles: {
    'fr-default-borders': '默认边框',
    'fr-dashed-borders': '虚线边框',
    'fr-alternate-rows': '斑马效果'
  },
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
