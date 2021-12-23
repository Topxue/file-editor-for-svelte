/** Created by xwp on 2021-12-23 **/

/**
 * 监听DOM
 */
export const observeDocument = (froala, callback) => {
  const target = froala.$el[0];
  if (!target) return;

  const observerOptions = {
    childList: true,  // 观察目标子节点的变化，是否有添加或者删除
    // attributes: true, // 观察属性变动
    subtree: true     // 观察后代节点，默认为 false
  }

  const observer = new MutationObserver((mutationList) => {

    for (let mutationRecord of mutationList) {
      if (mutationRecord.removedNodes) {
        for (let removedNode of mutationRecord.removedNodes) {
          // 查询为参数的节点-找到 不再遍历节点;
          if (removedNode?.tagName && removedNode?.hasAttribute('data-param-name')) {
            callback && callback();
            return;
          }
        }
      }
    }
  });
  observer.observe(target, observerOptions);
}
