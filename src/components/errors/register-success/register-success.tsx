import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const RegisterSuccess: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="success"
    title="Регистрация успешна"
    subTitle={
      <>
        <span>Регистрация прошла успешно. Зайдите</span>
        <br />
        <span>в приложение, используя свои e-mail и пароль.</span>
      </>
    }
    extra={
      <Button onClick={() => { history.push('/auth/login') }} style={{ width: "369px" }} type="primary" key="console">
        Войти
      </Button>
    }
  />
);

export default RegisterSuccess;