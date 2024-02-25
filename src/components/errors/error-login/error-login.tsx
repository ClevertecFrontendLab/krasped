import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const ErrorLogin: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="warning"
    title="Вход не выполнен"
    subTitle="Что то пошло не так. Попробуйте еще раз."
    extra={
      <Button onClick={() => { history.push('/auth/login') }} style={{ width: "369px" }} type="primary" key="console">
        Повторить
      </Button>
    }
  />
);

export default ErrorLogin;