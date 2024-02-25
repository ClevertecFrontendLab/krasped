import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const SuccessChangePassword: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="success"
    title="Пароль успешно изменен"
    subTitle={
      <>
        <span>Теперь можно войти в аккаунт, исползьуя</span>
        <br />
        <span>свой логин и новый пароль</span>
      </>
    }
    extra={
      <Button onClick={() => { history.push('/auth/login', { state: "reReg" }) }} style={{ width: "369px" }} type="primary" key="console">
        Вход
      </Button>
    }
  />
);

export default SuccessChangePassword;