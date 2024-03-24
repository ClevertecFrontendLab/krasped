import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from "@components/layouts/auth-layout/auth-layout"
import { ResultLayout } from '@components/layouts/result-layout/result-layout';
import { SuspenceLoaderComponent } from '@components/loader/suspence-loader';
import ProtectedRoute from '@components/protected-routes/protected-route';
import AnonimRoute from '@components/anonim-route/anonim-route';
import { _Auth, _AuthChangePassword, _AuthConfirmEmail, _AuthLogin, _AuthRegistration, _Calendar, _Error, _ErrorChangePassword, _ErrorCheckEmail, _ErrorCheckEmailNoExist, _ErrorLogin, _ErrorUserExist, _Feedbacks, _Main, _NotFoundPage, _Profile, _Result, _Settings, _Success, _SuccessChangePassword } from '@config/constants';

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
  const ErrorChangePassword = React.lazy(() => import('@components/errors/error-change-password/error-change-password'));
  const FeedbackPage = React.lazy(() => import('@pages/feedback-page/feedback-page'));
  const CalendarPage = React.lazy(() => import('@pages/calendar-page/calendar-page'));
  const ProfilePage = React.lazy(() => import('@pages/profile-page/profile-page'));
  const SettingsPage = React.lazy(() => import('@pages/settings-page/settings-page'));
  const NotFoundPage = React.lazy(() => import('@pages/404/404-page'));

  return (

    <Routes>
      <Route path={_Main} element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <MainPage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path={_Feedbacks} element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <FeedbackPage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path={_Calendar} element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <CalendarPage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path={_Profile} element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <ProfilePage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path={_Settings} element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <SettingsPage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path={_NotFoundPage} element={
        <ProtectedRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            < NotFoundPage />
          </React.Suspense>
        </ProtectedRoute>
      } />
      <Route path={_Auth} element={
        <AnonimRoute>
          <React.Suspense fallback={<SuspenceLoaderComponent />}>
            <AuthLayout />
          </React.Suspense>
        </AnonimRoute>
      } >
        <Route index element={<AuthPage />} />
        <Route path={_AuthLogin} element={<AuthPage />} />
        <Route path={_AuthRegistration} element={<AuthPage />} />
        <Route path={_AuthConfirmEmail} element={<ConfirmEmailForm />} />
        <Route path={_AuthChangePassword} element={<ChangePasswordFrom />} />
        <Route path="*" element={<Navigate to={_Main} replace />} />
      </Route>
      <Route path={_Result} element={

        <React.Suspense fallback={<SuspenceLoaderComponent />}>
          <ResultLayout />
        </React.Suspense>
      } >
        {/* {/* <Route path='/result/login' element={<AuthPage />} /> */}
        <Route path={_ErrorLogin} element={<ErrorLogin />} />
        <Route path={_Success} element={<RegisterSuccess />} />
        {/* status 409 */}
        <Route path={_ErrorUserExist} element={<ErrorUserExist />} />
        <Route path={_Error} element={<Error />} />
        {/* status 404 и message ‘Email не найден’ */}
        <Route path={_ErrorCheckEmailNoExist} element={<ErrorCheckEmailNoExist />} />
        {/* status 404 и без message ‘Email не найден’ */}
        <Route path={_ErrorCheckEmail} element={<ErrorCheckEmail />} />
        <Route path={_ErrorChangePassword} element={<ErrorChangePassword />} />
        <Route path={_SuccessChangePassword} element={<SuccessChangePassword />} />
        <Route path="*" element={<Navigate to={_Main} replace />} />
      </Route>
      <Route path="/" element={<Navigate to={_Main} replace state={{ from: window.location.search }} />} />
      <Route path="*" element={<Navigate to={_NotFoundPage} replace state={{ from: window.location.search }} />} />
    </Routes>
  );
};
export default App;
