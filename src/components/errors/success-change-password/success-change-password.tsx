import React from 'react';
import { Button, Grid, Result } from 'antd';
import { history } from '@redux/configure-store';

const SuccessChangePassword: React.FC = () => {
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
      title={<span style={{ fontWeight: 500 }}>{"Пароль успешно изменен"}</span>}
      subTitle={
        <>
          <span>Теперь можно войти в аккаунт, исползьуя</span>
          <br />
          <span>свой логин и новый пароль</span>
        </>
      }
      extra={
        <Button size='large' data-test-id='change-entry-button' onClick={() => { history.push('/auth/login', { state: "reReg" }) }} style={{ maxWidth: "369px", width: "100%" }} type="primary" key="console">
          Вход
        </Button>
      }
    />
  )
};

export default SuccessChangePassword;