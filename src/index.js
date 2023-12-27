import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from '@/router';

import { Provider } from 'react-redux';
import store from './store';

// 导入定制主题文件
import './theme.css'

import { RouterProvider } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
