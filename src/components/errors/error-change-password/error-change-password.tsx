import React, { useEffect } from 'react';
import { Button, Grid, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';

const ErrorChangePassword: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    if (history?.location.state && locationState?.from && locationState?.formState) {
      if (locationState?.from === "reFetchChangePass") { /* empty */ }
    } else {
      history.push("/auth/change-password", history?.location?.state)
    }
  }, []);
  return (
    <Result
      style={{
        maxWidth: "539px",
        width: "calc(100% - 16px)",
        margin: "16px",
        padding: screens.xs ? "32px 16px" : "64px 0",
        zIndex: 1,
        backgroundColor: "white"
      }}
      status="error"
      title={<span style={{ fontWeight: 500 }}>{"Данные не сохранились"}</span>}
      subTitle={
        <>
          <span>Что то пошло не так. Попробуйте ещё раз</span>
        </>
      }
      extra={
        <Button data-test-id='change-retry-button' size='large' onClick={() => { history.push('/auth/change-password', history?.location?.state) }} style={{ maxWidth: "369px", width: "100%" }} type="primary" key="console">
          Повторить
        </Button>
      }
    />
  );
}

export default ErrorChangePassword;