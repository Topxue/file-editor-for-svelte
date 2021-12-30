### 文件在线编辑器


### 下载
```markdown
yarn add pg-file-template-editor
```

### 引入
```markdown
import FileTemplateEditor from 'pg-file-template-editor'
```

### 使用
```markdown
new FileTemplateEditor({
    target: '#ID',  // 必填 
    isOff: Boolean, // 默认为false
})
```

### 参数事件
```markdown
 target: 根节点 -> '#ID'
 isOff: 是否关闭编辑 -> Boolean
 getData: () => {} // 获取数据
```

### 样式覆盖
```css
/* toolbar 宽度 */
--toolbar-width: 100%
```
