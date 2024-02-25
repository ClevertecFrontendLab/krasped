import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const ErrorCheckEmailNoExist: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="error"
    title="Такой e-mail не зарегистрирован"
    subTitle={
      <>
        <span>Мы не нашли в базе вашего e-mail. Попробуйте</span>
        <br />
        <span>войти с другим e-mail.</span>
      </>
    }
    extra={
      <Button onClick={() => { history.push('/auth/login') }} style={{ width: "369px" }} type="primary" key="console">
        Попробовать снова
      </Button>
    }
  />
);

export default ErrorCheckEmailNoExist;