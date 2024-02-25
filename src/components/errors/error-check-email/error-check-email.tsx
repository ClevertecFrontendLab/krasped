import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const ErrorCheckEmail: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    title="Что-то пошло не так"
    status="500"
    subTitle="Произошла ошибка, попробуйте отправить форму еще раз."
    extra={
      <Button onClick={() => { history.push('/auth/login', { state: "reLog" }) }} type="primary" key="console">
        Назад
      </Button>
    }
  />
);

export default ErrorCheckEmail;