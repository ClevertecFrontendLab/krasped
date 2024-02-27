import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';

const ErrorLogin = () => {
  // useEffect(() => {
  //   const locationState = history?.location?.state as ILocationState;
  //   if (!locationState || (!locationState.from)) {
  //     history.push('/auth/login');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (<Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="warning"

    title={<span style={{ fontWeight: 500 }}>{"Вход не выполнен"}</span>}
    subTitle="Что то пошло не так. Попробуйте еще раз."
    extra={
      <Button data-test-id='login-retry-button' onClick={() => { history.push('/auth/login') }} style={{ width: "369px" }} type="primary" key="console">
        Повторить
      </Button>
    }
  />)
};

export default ErrorLogin;