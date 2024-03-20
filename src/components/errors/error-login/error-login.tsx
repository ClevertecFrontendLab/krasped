import React, { useEffect } from 'react';
import { Button, Grid, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';
import { _AuthLogin } from '@config/constants';

const ErrorLogin = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (<Result
    style={{
      maxWidth: "539px",
      width: "calc(100% - 16px)",
      margin: "16px",
      padding: screens.xs ? "32px 16px" : "64px 0",
      zIndex: 1,
      backgroundColor: "white"
    }}
    status="warning"

    title={<span style={{ fontWeight: 500 }}>{"Вход не выполнен"}</span>}
    subTitle="Что то пошло не так. Попробуйте еще раз."
    extra={
      <Button
        size='large'
        data-test-id='login-retry-button'
        onClick={() => { history.push(_AuthLogin) }}
        style={{ maxWidth: "369px", width: "100%" }}
        type="primary"
        key="console">
        Повторить
      </Button>
    }
  />)
};

export default ErrorLogin;