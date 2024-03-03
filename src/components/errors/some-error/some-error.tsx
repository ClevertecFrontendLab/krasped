import React from 'react';
import { Button, Grid, Result } from 'antd';
import { history } from '@redux/configure-store';

const SomeError: React.FC = () => {
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
      subTitle="Произошла ошибка, попробуйте еще раз."
      extra={
        <Button size='large' onClick={() => { history.push('/main') }} type="primary" key="console">
          Назад
        </Button>
      }
    />
  )
};

export default SomeError;