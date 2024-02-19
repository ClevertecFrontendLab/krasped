import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6'
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout } from "@components/layouts/auth-layout/auth-layout"
import { history, store } from '@redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.scss';
import { AuthPage } from '@pages/auth-page/auth-page';
import { ResultLayout } from '@components/layouts/result-layout/result-layout';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/auth' element={<AuthLayout />} >
                        <Route index element={<AuthPage />} />
                        <Route path='/auth/login' element={<AuthPage />} />
                        <Route path='/auth/registration' element={<AuthPage />} />
                    </Route>
                    <Route path='/result' element={<ResultLayout />} >
                        {/* <Route path='/result/login' element={<AuthPage />} />
                        <Route path='/result/registration' element={<AuthPage />} /> */}
                    </Route>
                    {/* <Route path='*' element={<NotFoundPage />} /> */}
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode >,
);
