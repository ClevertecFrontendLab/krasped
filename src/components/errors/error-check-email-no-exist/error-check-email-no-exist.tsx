import { Button, Grid, Result } from 'antd';
import { history } from '@redux/configure-store';

const ErrorCheckEmailNoExist = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  (<Result
    style={{
      maxWidth: "539px",
      width: "calc(100% - 16px)",
      margin: "16px",
      padding: screens.xs ? "32px 16px" : "64px 0",
      zIndex: 1,
      backgroundColor: "white"
    }}
    status="error"
    title={<span style={{ fontWeight: 500 }}>{"Такой e-mail не зарегистрирован"}</span>}
    subTitle={
      <>
        <span>Мы не нашли в базе вашего e-mail. Попробуйте</span>
        <br />
        <span>войти с другим e-mail.</span>
      </>
    }
    extra={
      <Button size='large' data-test-id='check-retry-button' onClick={() => { history.push('/auth/login') }} style={{ maxWidth: "369px", width: "100%" }} type="primary" key="console">
        Попробовать снова
      </Button>
    }
  />)
}

export default ErrorCheckEmailNoExist;