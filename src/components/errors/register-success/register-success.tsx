import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const RegisterSuccess: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
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
      <Button data-test-id='registration-enter-button' onClick={() => { history.push('/auth/login') }} style={{ width: "369px" }} type="primary" key="console">
        Войти
      </Button>
    }
  />
);

export default RegisterSuccess;