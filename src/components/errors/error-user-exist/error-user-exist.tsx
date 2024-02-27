import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const ErrorUserExist: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="error"
    title={<span style={{ fontWeight: 500 }}>{"Данные не сохранились"}</span>}
    subTitle={
      <>
        <span>Такой e-mail уже записан в системе. Попробуйте</span>
        <br />
        <span>зарегистрироваться по другому e-mail.</span>
      </>
    }
    extra={
      <Button data-test-id='registration-back-button' onClick={() => { history.push('/auth/registration') }} style={{ width: "369px" }} type="primary" key="console">
        Назад к регистрации
      </Button>
    }
  />
);

export default ErrorUserExist;