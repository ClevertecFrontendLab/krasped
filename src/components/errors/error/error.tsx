import React, { useEffect } from 'react';
import { Button, Grid, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';
import { _AuthRegistration } from '@config/constants';

const Error: React.FC = () => {
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
        <Button size='large'
          data-test-id='registration-retry-button'
          onClick={() => { history.push(_AuthRegistration, history?.location?.state) }}
          style={{ maxWidth: "369px", width: "100%" }}
          type="primary"
          key="console">
          Повторить
        </Button>
      }
    />
  );
}

export default Error;