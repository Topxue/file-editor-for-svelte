import './config/plugin';
import './assets/style/global.scss';
import App from './App.svelte';

const FileTemplateEditor = (options) => {
	if (!options?.target) throw Error('请传入容器 Selector！');
	const {target, ...props} = options;

	return new App({
		target: document.querySelector(target),
		props: {
			options: props
		},
	})
}

FileTemplateEditor({
	target: '#root',
	isOff: true
})

export default FileTemplateEditor;
