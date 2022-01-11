/** Created by xwp on 2021-12-22 **/
import {randomId} from '@/utils';
import initData from "@/utils/init-data";
import {parametersStore} from "@/store/froala";

/**
 * 生成表头
 */
const createTableTHeader = (col) => {
  let THeaderTpl = '';
  for (let h = 0; h < col; h++) {
    THeaderTpl += `<th data-pg-th="column${h}"></th>`
  }
  return THeaderTpl;
}

/**
 * 生成table 行、列;
 * @param row
 * @param col
 */
const createTableRowCol = (row, col) => {
  let tbodyContent = '';
  for (let r = 0; r < row; r++) {
    const fragment = document.createElement('div');
    let tr = document.createElement('tr');
    for (let c = 0; c < col; c++) {
      tr.innerHTML += `<td style="width: 10%;" data-pg-table="td"></td>`
    }
    fragment.append(tr);
    tbodyContent += fragment.innerHTML;
  }
  return tbodyContent;
}

/**
 * 根据列生成 column key
 * @param col
 */
const generateColumnsKey = (data, col) => {
  const columnKeys = [];
  for (let i = 0; i < col; i++) {
    columnKeys.push(`column${i}`);
  }

  data.columnKeys = columnKeys;

  return data;
}

/**
 * table 渲染
 * @returns {string}
 */
export const tableRender = (row, col) => {
  const id = randomId();
  const data = {...initData['table'], id};

  const resData = generateColumnsKey(data, col);

  parametersStore.addData(resData);

  const template = `
   <div class="fr-deletable pg-table-container" data-param-name="表格1" data-param-type="table" id="${id}">
      <table class="" style="width: 100%;">
        <thead data-pg-table="thead">
          <tr>
            ${createTableTHeader(col)}
          </tr>
        </thead>
        <tbody>
            ${createTableRowCol(row, col)}
        </tbody>
      </table>
   </div>
  `

  return {
    template,
    id
  }
}
