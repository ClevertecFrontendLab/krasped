import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { history, store } from '@redux/configure-store';
import dayjs from "dayjs"
import 'dayjs/locale/ru';
dayjs.locale('ru');
import ru from 'antd/es/locale/ru_RU';

import 'normalize.css';
import './index.scss';
import App from './App';
import { ConfigProvider } from 'antd';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <ConfigProvider locale={ru}>
                    <App />
                </ConfigProvider>
            </HistoryRouter>
        </Provider>
    </React.StrictMode >,
);
