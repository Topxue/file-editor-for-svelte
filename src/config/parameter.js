/** Created by xwp on 2021-12-16 **/


/**
 * 参数库数据
 */
export const PARAMETERS = [
  {
    label: '普通文本',
    icon: 'fa fa-text-width',
    type: 'text'
  },
  {
    label: '动态表格',
    icon: 'fa fa-table',
    type: 'table'
  },
  {
    label: '图片',
    icon: 'fa fa-image',
    type: 'image'
  },
  {
    label: '单选',
    icon: 'fa fa-check-circle',
    type: 'radio'
  },
  {
    label: '多选',
    icon: 'fa fa-check-square',
    type: 'checkbox'
  },
  {
    label: '日期',
    icon: 'fa fa-calendar',
    type: 'date'
  },
  {
    label: '身份证号',
    icon: 'fa fa-id-card',
    type: 'idcard'
  },
]


/**
 * 外观
 */
export const GET_BORDERS = (paramType) => {
  if (['text', 'date'].includes(paramType)) {
    return [
      {value: 'bottom', label: '下划线'},
      {value: 'all', label: '边框'},
      {value: 'none', label: '无边框'}
    ]
  }

  if (['radio', 'checkbox'].includes(paramType)) {
    return [
      {value: 'bottom', label: '下划线样式'},
      {value: 'all', label: '标准样式'},
    ]
  }
}

/**
 * 字体
 */
export const FONT_LISTS = [
  {
    fontName: '微软雅黑',
    font: 'Microsoft YaHei, STXihei, BASE'
  },
  {
    fontName: '宋体',
    font: 'SimSun, STSong, BASE'
  },
  {
    fontName: '黑体',
    font: 'SimHei, STHeiti, BASE'
  },
  {
    fontName: '仿宋',
    font: 'FangSong, STFangsong, BASE'
  },
  {
    fontName: '楷体',
    font: 'KaiTi, STKaiti, BASE'
  },
  {
    fontName: 'Arial',
    font: 'Arial'
  },
  {
    fontName: 'Georgia',
    font: 'Georgia'
  },
  {
    fontName: 'Impact',
    font: 'Impact'
  },
  {
    fontName: 'Tahoma',
    font: 'Tahoma'
  },
  {
    fontName: 'Times New Roman',
    font: 'Times New Roman'
  },
  {
    fontName: 'Verdana',
    font: 'Verdana'
  },
]

/**
 * 控件大小
 */
export const CONTROL_OPTIONS = [
  {value: 'auto', label: '根据填写内容自动变化'},
  {value: 'fixed', label: '固定大小(默认)'},
  {value: 'customize', label: '固定大小(自定义)'},
]

/**
 * 字体大小
 * @returns {unknown[]}
 * @constructor
 */
export const FONT_SIZE_OPTIONS = () => {
  const LEN = 16;
  return new Array(LEN).fill(12).map((prev, index) => {
    return prev + (index < 10 ? index * 2 : index * 6 - 6);
  }, 12);
}

/**
 * 字体粗细
 * @constructor
 */
export const FONT_WEIGHT_OPTIONS = [
  {value: 'inherit', label: '默认'},
  {value: 'bold', label: '加粗'},
  {value: 'normal', label: '不加粗'}
]

/**
 * 对齐方式
 */
export const ALIGNMENT_LIST = [
  {value: 'flex-start', label: '左对齐'},
  {value: 'center', label: '居中'},
  {value: 'flex-end', label: '右对齐'}
]

/**
 *布局
 */
export const LAYOUT_OPTIONS = [
  {value: 'dropdown', label: '下拉菜单'},
  {value: 'horizontal', label: '横向排列'},
  {value: 'vertical', label: '纵向排列'}
]

/**
 * 日期格式
 */
export const DATE_FORMAT_OPTIONS = [
  {value: 'yyyy-MM-dd', label: 'yyyy-MM-dd'},
  {value: 'yyyy/MM/dd', label: 'yyyy/MM/dd'},
  {value: 'yyyy年MM月dd日', label: 'yyyy年MM月dd日'}
]

/**
 * icon-enum
 */
export const ICON_ENUM = {
  'text': 'fa fa-text-width',
  'table': 'fa fa-table',
  'image': 'fa fa-image',
  'radio': 'fa fa-check-circle',
  'checkbox': 'fa fa-check-square',
  'date': 'fa fa-calendar',
  'idcard': 'fa fa-id-card'
}

/**
 * 图片默认背景
 * @type {string}
 */
export const defaultImageBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAAE7CAYAAAArYeaHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAxOToxMDoyOSAxNDo0MzoyOUay+ycAAAODSURBVHhe7dOhAcAwDMCwrP//u7CV7AcTifgCP+/uN0Dm/AUiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoSYCSFmQoiZEGImhJgJIWZCiJkQYiaEmAkhZkKImRBiJoTUzAXE2AZcEksseQAAAABJRU5ErkJggg=='
