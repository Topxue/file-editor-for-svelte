/** Created by xwp on 2021-12-16 **/

import db from "./db";

/**
 * 生成随机 ID
 * @type {function(): string}
 */
export const randomId = (num = 32) => {
  let returnStr = "", charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < num; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }

  return returnStr;
}


/**
 * RGB颜色转换为十六进制
 * @param color
 * @returns {string|*}
 */
export const colorHex = (color) => {
  let that = color;
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    let aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  }
  return that;
}

/**
 * 将数据库实例 改为Promise
 * @param request
 * @returns {Promise<unknown>}
 */
export const promisify = (request) => {
  return new Promise((resolve, reject) => {
    request.onsuccess = resolve;
    request.onerror = reject;
  })
}

/**
 * 参数插入富文本校验
 * @returns {boolean}
 */
export const insertParameterVerify = () => {
  const anchorNode = window?.getSelection()?.anchorNode;
  if (anchorNode?.tagName) {
    const isExistTable = ['td', 'th'].includes(anchorNode?.tagName.toLowerCase()),
      isParameter = anchorNode?.getAttribute('data-param-type') || anchorNode.closest('[data-param-type]');

    return isParameter || isExistTable ? false : true;
  } else {
    return true;
  }
}

/**
 * 当前时间
 * @param froala
 */
export const getCurrentTime = (time = +new Date()) => {
  const date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
}

/**
 * sleep 函数
 * @param time
 * @returns {Promise<unknown>}
 */
export const sleep = time => {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 替换table插入内容
 * @param table
 */
export const replaceTableContent = (table) => {
  const cloneTable = table.cloneNode(true);
  table.remove();

  const fragment = document.createElement('div');
  const tableWrapper = document.createElement('div');
  tableWrapper.className = 'fr-deletable';
  tableWrapper.innerHTML = `<table class="" style="width: 100%">${cloneTable.innerHTML}</table>`;
  fragment.append(tableWrapper);

  return fragment.innerHTML;
}

/**
 *  获取编辑区域所存在的参数
 */

export const getFroalaContentParams = (froala) => {
  const froalaContainer = froala.$el[0];
  const parameters = [...froalaContainer.querySelectorAll('[data-param-type]')];

  return parameters;
}

/**
 * 获取并且更新参数库数据
 */
export const getUpdateParametersData = async (froala) => {
  const parameters = await getFroalaContentParams(froala);

  const dbDataAll = await db.getAll();
  const data = dbDataAll.map(item => {
    const isExist = parameters.find(element => element.getAttribute('id') === item.id);
    if (isExist) {
      return item
    } else {
      db.removeItem(item.id);
    }
  }).filter(item => item);

  return data;
}
