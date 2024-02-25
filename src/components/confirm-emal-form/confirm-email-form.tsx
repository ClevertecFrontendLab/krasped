import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';
import VerificationInput from "react-verification-input";

const ConfirmEmailForm: React.FC = () => {
  const status = "error"
  const email = "123"
  // onClick={() => { history.push("/result", { from: "login" }) }}
  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    console.log(history?.location?.state)
    // if (!history?.location.state || !locationState?.from) {
    //   history.push('/auth/login');
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname]);
  return (

    <Result
      style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}

      title={
        <>
          <span>Введите код</span>
          <br />
          <span>для восстановления аккаунта</span>
        </>
      }
      subTitle={
        <>
          <span>Мы отправили на e-mail {email} </span>
          <br />
          <span>шестизначный код.Введите его в поле ниже.</span>
        </>
      }
      extra={
        <div>
          <VerificationInput />
          <p>Не пришло письмо? Проверьте папку Спам.</p>
        </div>

      }
    />
  )
};

export default ConfirmEmailForm;