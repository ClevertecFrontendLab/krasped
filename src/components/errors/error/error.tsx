import React from 'react';
import { Button, Result } from 'antd';
import { history } from '@redux/configure-store';

const Error: React.FC = () => (
  <Result
    style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
    status="error"
    title="Данные не сохранились"
    subTitle={
      <>
        <span>Что то пошло не так и ваша регистрация</span>
        <br />
        <span>не завершилась. Попробуйте ещё раз.</span>
      </>
    }
    extra={
      <Button onClick={() => { history.push('/auth/registration', { state: "reReg" }) }} style={{ width: "369px" }} type="primary" key="console">
        Повторить
      </Button>
    }
  />
);

export default Error;