import React from 'react';
import { Button, Grid, Result } from 'antd';
import { history } from '@redux/configure-store';
import { _AuthLogin } from '@config/constants';

const RegisterSuccess = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
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
      status="success"

      title={<span style={{ fontWeight: 500 }}>{"Регистрация успешна"}</span>}
      subTitle={
        <>
          <span>Регистрация прошла успешно. Зайдите</span>
          <br />
          <span>в приложение, используя свои e-mail и пароль.</span>
        </>
      }
      extra={
        <Button size='large'
          data-test-id='registration-enter-button'
          onClick={() => { history.push(_AuthLogin) }}
          style={{ maxWidth: "369px", width: "100%" }}
          type="primary" key="console">
          Войти
        </Button>
      }
    />
  )
};

export default RegisterSuccess;