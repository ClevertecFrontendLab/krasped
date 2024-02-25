import React, { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from "@components/layouts/auth-layout/auth-layout"
import { ResultLayout } from '@components/layouts/result-layout/result-layout';
import { SuspenceLoaderComponent } from '@components/loader/suspence-loader';
import ProtectedRoute from '@components/protected-routes/protected-route';
import AnonimRoute from '@components/anonim-route/anonim-route';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { useAppDispatch } from './hooks';
import { setToken } from '@redux/userSlice';
import { history } from '@redux/configure-store';

const App: React.FC = () => {
  const AuthPage = React.lazy(() => import('@pages/auth-page/auth-page'));
  const ConfirmEmailForm = React.lazy(() => import('@components/confirm-emal-form/confirm-email-form'));
  const ChangePasswordFrom = React.lazy(() => import('@components/change-password-form/change-password-from'));
  const MainPage = React.lazy(() => import('@pages/main-page/main-page'));
  const ErrorLogin = React.lazy(() => import('@components/errors/error-login/error-login'));
  const RegisterSuccess = React.lazy(() => import('@components/errors/register-success/register-success'));
  const ErrorUserExist = React.lazy(() => import('@components/errors/error-user-exist/error-user-exist'));
  const Error = React.lazy(() => import('@components/errors/error/error'));
  const ErrorCheckEmailNoExist = React.lazy(() => import('@components/errors/error-check-email-no-exist/error-check-email-no-exist'));
  const ErrorCheckEmail = React.lazy(() => import('@components/errors/error-check-email/error-check-email'));
  const SuccessChangePassword = React.lazy(() => import('@components/errors/success-change-password/success-change-password'));

  const dispatch = useAppDispatch()
  const [token, setTok] = useLocalStorage("token", null);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token))
      history.push("/")
    }
  }, [token])
  return (

    <Routes>
      <Route path='/main' element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <MainPage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path='/auth' element={
        <AnonimRoute>

          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <AuthLayout />
          </React.Suspense>
        </AnonimRoute>
      } >
        <Route index element={<AuthPage />} />
        <Route path='/auth/login' element={<AuthPage />} />
        <Route path='/auth/registration' element={<AuthPage />} />
        <Route path='/auth/confirm-email' element={<ConfirmEmailForm />} />
        <Route path='/auth/change-password' element={<ChangePasswordFrom />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Route>
      <Route path='/result' element={

        <React.Suspense fallback={<SuspenceLoaderComponent />}>
          <ResultLayout />
        </React.Suspense>
      } >
        {/* {/* <Route path='/result/login' element={<AuthPage />} /> */}
        <Route path='/result/error-login' element={<ErrorLogin />} />
        <Route path='/result/success' element={<RegisterSuccess />} />
        {/* status 409 */}
        <Route path='/result/error-user-exist' element={<ErrorUserExist />} />
        <Route path='/result/error' element={<Error />} />
        {/* status 404 и message ‘Email не найден’ */}
        <Route path='/result/error-check-email-no-exist' element={<ErrorCheckEmailNoExist />} />
        {/* status 404 и без message ‘Email не найден’ */}
        <Route path='/result/error-check-email' element={<ErrorCheckEmail />} />
        <Route path='/result/error-change-password' element={<ErrorCheckEmail />} />
        <Route path='/result/success-change-password' element={<SuccessChangePassword />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/main" replace />} />
      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Routes>
  );
};
export default App;
