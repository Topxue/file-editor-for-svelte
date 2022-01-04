import './config/plugin';
import './assets/style/global.scss';
import db from './utils/db';
import App from './App.svelte';
import {froalaStore} from "./store/froala";
import {getUpdateParametersData} from './utils';
import testData from './config/test';

class FileTemplateEditor {
  constructor(options) {
    this.froala = null;
    this.options = options;

    this._init();
  }

  _init() {
    this.initApp();
    FileTemplateEditor._createIconLink();
  }

  /**
   * 初始化根组件
   */
  initApp() {
    if (!FroalaEditor) throw Error('请引入 Froala！');
    if (!this.options?.target) throw Error('请传入容器 Selector！');
    const {target, ...props} = this.options;
    new App({
      target: document.querySelector(target),
      props: {
        options: props,
      },
    })
  }

  /**
   * 动态加载 font-awesome.css
   */
  static _createIconLink() {
    const HREF_URL = 'https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css';
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = HREF_URL;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  }

  /**
   * 获取模板&参数数据
   * @returns {{html: (*|string), parameters: *[]}}
   */
  async getData() {
    froalaStore.subscribe(froala => {
      this.froala = froala;
    })

    const froala = this.froala;
    const template = froala.html?.get().replace('is-active', '') || '';
    const parameters = await getUpdateParametersData(froala);

    return {
      template,
      parameters
    }
  }

  /**
   * 清空数据库数据
   * @returns {Promise<void>}
   */
  static async clearData() {
    await db.setItemTmp('');
    await db.removeAll();
  }
}

window.onbeforeunload = async () => {
  await FileTemplateEditor.clearData();
}


// 测试代码
const data = testData.data;
const editor = new FileTemplateEditor({
  target: '#root',
  isOff: false,
  data: {
    // template: '',
    // parameters: []
    fileName: 'joker',
    template: data.templateContent,
    parameters: data.params
  },
  getInitiate(data) {
    console.log(data, 'data')
  }
})

console.log(editor, 'editor...')

export default FileTemplateEditor;
