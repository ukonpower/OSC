import ReactDOM from 'react-dom/client';

import { ShaderEditorApp } from './ShaderEditorApp';

import { initResouces } from '~/resources';

import '~/styles/style.scss';

// リソース初期化
initResouces();

// React アプリケーションをマウント
ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
	<ShaderEditorApp />
);
