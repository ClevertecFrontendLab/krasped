import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import { AuthPage } from '@pages/auth-page/auth-page';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <HistoryRouter history={history}>{routes}</HistoryRouter> */}
            <HashRouter>
                <Routes>
                    {/* <Route path='/' element={<MainPage />} /> */}
                    <Route path='/' element={<AuthPage />} />
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode >,
);
