import React from 'react';
import { Button, Grid, Result } from 'antd';
import { history } from '@redux/configure-store';
import { _AuthLogin } from '@config/constants';

const ErrorCheckEmail: React.FC = () => {
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
      title={<span style={{ fontWeight: 500 }}>{"Что-то пошло не так"}</span>}
      status="500"
      subTitle="Произошла ошибка, попробуйте отправить форму еще раз."
      extra={
        <Button size='large'
          data-test-id='check-back-button'
          onClick={() => { history.push(_AuthLogin, history?.location?.state) }}
          type="primary" key="console">
          Назад
        </Button>
      }
    />
  )
};

export default ErrorCheckEmail;