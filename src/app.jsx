import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Editor from 'gaea-editor';

import PageButton from './plugins/page-button/index.tsx';
import Page from './plugins/page/index.tsx';
import Pageaddpage from './plugins/page-add-page/index.tsx';

ReactDOM.render(
    <div style={{ width: '100vw', height: '100vh' }}>
        <Editor plugins={[PageButton,Page,Pageaddpage]}/>
    </div>,
    document.getElementById("app")
);

