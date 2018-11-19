
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Editor } from '@tinymce/tinymce-react';

function dynamicLoadScript(id, src, onload) {
  if (!document.body.querySelector('#'+id)) {
    let scriptEle = document.createElement('script');
    scriptEle.id = id;
    scriptEle.type = 'text/javascript';
    scriptEle.onload = onload;
    scriptEle.src = src;
    document.body.appendChild(scriptEle);
  } else {
    onload();
  }
}

// 这里面用了url加载整个包

// 手动import tinymce 的包
// 或者将使用的包全部加载
// import 'tinymce';
// import 'tinymce/themes/modern';
// import 'tinymce/skins/lightgray/skin.min.css';
// const context = require.context('tinymce/plugins', true, /\.js$/);
// context.keys().map((path) => context(path));

class TinymceEditor extends Component {
  static propTypes = {
    init: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  /**
   * 默认的tinymce配置
   *
   * @memberof TinymceEditor
   */
  defaultConfig = {
    height: 300,
    max_height: 500,
    language_url: '/static/js/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/static/js/tinymce/skins/lightgray',
    codesample_content_css: '/static/js/tinymce/plugins/codesample/css/prism.css',
    visualblocks_content_css: '/static/js/tinymce/plugins/visualblocks/css/visualblocks.css',

    // plugin_base_urls: '/static/js/tinymce/plugins',
    // themt: 'modern',
    // theme_url: '/static/js/tinymce/themes/modern/theme.min.js',
    content_css : '/static/js/tinymce/skins/lightgray/content.min.css',
    branding: false,
    // 所有配置
    plugins: 'advlist anchor autolink autosave bbcode charmap code codesample textcolor colorpicker contextmenu directionality emoticons media fullpage fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern toc visualblocks  visualchars wordcount',
    toolbar: 'newdocument undo redo | formatselect fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough removeformat | ltr rtl  outdent indent | alignleft alignright aligncenter alignjustify | bullist numlist subscript superscript | link unlink table image | blockquote charmap hr | searchreplace code preview fullscreen',
  };

  constructor(props) {
    super(props);
    this.state = {
      tinymceLoaded: false,
    };
  }
  componentDidMount() {
    dynamicLoadScript('tinymce', '/static/js/tinymce/tinymce.full.min.js', () => {
      this.setState({
        tinymceLoaded: true,
      });
    });
  }
  render() {
    const { init, value, onChange } = this.props;
    const { tinymceLoaded } = this.state;
    if (!tinymceLoaded) {
      return null;
    }
    return (
      <Editor
        value={value}
        init={{
          ...this.defaultConfig,
          ...init,
        }}
        onChange={onChange}
      />
    );
  }
}

export default TinymceEditor;

// Editor可用事件
// onActivate
// onAddUndo
// onBeforeAddUndo
// onBeforeExecCommand
// onBeforeGetContent
// onBeforeRenderUI
// onBeforeSetContent
// onBeforePaste
// onBlur
// onChange
// onClearUndos
// onClick
// onContextMenu
// onCopy
// onCut
// onDblclick
// onDeactivate
// onDirty
// onDrag
// onDragDrop
// onDragEnd
// onDragGesture
// onDragOver
// onDrop
// onExecCommand
// onFocus
// onFocusIn
// onFocusOut
// onGetContent
// onHide
// onInit
// onKeyDown
// onKeyPress
// onKeyUp
// onLoadContent
// onMouseDown
// onMouseEnter
// onMouseLeave
// onMouseMove
// onMouseOut
// onMouseOver
// onMouseUp
// onNodeChange
// onObjectResizeStart
// onObjectResized
// onObjectSelected
// onPaste
// onPostProcess
// onPostRender
// onPreProcess
// onProgressState
// onRedo
// onRemove
// onReset
// onSaveContent
// onSelectionChange
// onSetAttrib
// onSetContent
// onShow
// onSubmit
// onUndo
// onVisualAid
