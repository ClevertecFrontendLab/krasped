import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';

const ErrorChangePassword: React.FC = () => {
  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    if (history?.location.state && locationState?.from && locationState?.formState) {
      if (locationState?.from === "reFetchChangePass") { /* empty */ }
    } else {
      history.push("/auth/change-password", history?.location?.state)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history?.location?.pathname]);
  return (
    <Result
      style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
      status="error"
      title="Данные не сохранились"
      subTitle={
        <>
          <span>Что то пошло не так. Попробуйте ещё раз</span>
        </>
      }
      extra={
        <Button data-test-id='change-retry-button' size='large' onClick={() => { history.push('/auth/change-password', history?.location?.state) }} style={{ width: "369px" }} type="primary" key="console">
          Повторить
        </Button>
      }
    />
  );
}

export default ErrorChangePassword;