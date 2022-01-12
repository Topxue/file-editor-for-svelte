/** Created by xwp on 2022-01-10 **/
export const weeks = ['一', '二', '三', '四', '五', '六', '日'];
export const mouths = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

/**
 * 替换日期为年月日
 */
export const dateFormat = (dateVal) => {
  return dateVal.replace(/(.+?)\-(.+?)\-(.+)/, "$1年$2月$3日")
}

/**
 * 获取年
 */
export const getYears = (currentYear = new Date().getFullYear()) => {
  let years = [];
  let freezeVal = currentYear;

  for (let i = 1; i < 15; i++) {
    if (i < 7) {
      currentYear--;
      years.push(currentYear);
    } else {
      years.unshift(freezeVal);
      freezeVal++;
    }
  }

  return years;
}
