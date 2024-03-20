import { Button, Grid, Result } from 'antd';
import { history } from '@redux/configure-store';
import { _AuthRegistration } from '@config/constants';

const ErrorUserExist = () => {
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
          <span>Такой e-mail уже записан в системе. Попробуйте</span>
          <br />
          <span>зарегистрироваться по другому e-mail.</span>
        </>
      }
      extra={
        <Button size='large' 
        data-test-id='registration-back-button' 
        onClick={() => { history.push(_AuthRegistration) }} 
        style={{ maxWidth: "369px", width: "100%" }} 
        type="primary" 
        key="console">
          Назад к регистрации
        </Button>
      }
    />
  );
}

export default ErrorUserExist;