/** Created by xwp on 2021-12-16 **/
import 'uikit/dist/css/uikit.min.css';

import 'froala-editor/js/languages/zh_cn';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/js/plugins/align.min';
import 'froala-editor/js/plugins/colors.min';
import 'froala-editor/js/plugins/draggable.min';
import 'froala-editor/js/plugins/font_size.min';
import 'froala-editor/js/plugins/word_paste.min';
import 'froala-editor/js/plugins/font_family.min';
import 'froala-editor/js/plugins/line_height.min';
import 'froala-editor/js/plugins/paragraph_format.min';

import FroalaEditor from 'froala-editor';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);
window.UIkit = UIkit;
window.FroalaEditor = FroalaEditor;

