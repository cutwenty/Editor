
// editor因为使用url加载tinymce不用loadable，因此这个文件不必用

import React from 'react';
import Loadable from 'react-loadable';

import Loading from './Loading';

const TinymceEditorWrapper = Loadable({
  delay: 1000,
  loader: () => {
    return import('./TinymceEditor').then(raw => {
      const Component = raw.default || raw;
      return props => <Component {...props} />;
    })
  },
  loading: () => <Loading inner={true} loading={true} />
});


export default TinymceEditorWrapper;

