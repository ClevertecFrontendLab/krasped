import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';

const Error: React.FC = () => {
  return (
    <Result
      style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}
      status="error"
      title={<span style={{ fontWeight: 500 }}>{"Данные не сохранились"}</span>}
      subTitle={
        <>
          <span>Что то пошло не так и ваша регистрация</span>
          <br />
          <span>не завершилась. Попробуйте ещё раз.</span>
        </>
      }
      extra={
        <Button data-test-id='registration-retry-button' onClick={() => { history.push('/auth/registration', history?.location?.state) }} style={{ width: "369px" }} type="primary" key="console">
          Повторить
        </Button>
      }
    />
  );
}

export default Error;