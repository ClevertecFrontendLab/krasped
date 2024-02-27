import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { ILocationState, history } from '@redux/configure-store';
import VerificationInput from "react-verification-input";
import { useConfirmEmailMutation } from '@api/auth/auth';
import styles from './confirm-email-form.module.scss';

const ConfirmEmailForm: React.FC = () => {
  const [confirmEmail, { isLoading, isSuccess, isError }] = useConfirmEmailMutation();
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [email, setEmail] = useState('')

  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    if (history?.location.state && locationState?.from && locationState?.formState) {
      setEmail(locationState?.formState?.email)
    } else {
      history.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history?.location?.pathname]);

  useEffect(() => {
    if (isSuccess) {
      history.push("/auth/change-password", history?.location?.state)
    }

  }, [isLoading])

  useEffect(() => {
    if (verificationCode.length === 6) {
      if (email) {
        confirmEmail({ email, code: verificationCode });
      }
      setVerificationCode('');
    }
  }, [verificationCode])
  return (

    <Result
      style={{ maxWidth: "539px", width: "100%", margin: "16px", zIndex: 1, backgroundColor: "white" }}

      title={isError ?
        <span>Неверный код. Введите код для восстановления аккаунта</span>
        :
        <span style={{ lineHeight: "32px", fontWeight: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span>Введите код</span>
          <span>для восстановления аккаунта</span>
        </span>
      }
      subTitle={
        <>
          <span>Мы отправили на e-mail {email} </span>
          <br />
          <span>шестизначный код.Введите его в поле ниже.</span>
        </>
      }
      extra={
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <VerificationInput
            data-test-id='verification-input'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e)}
            classNames={{
              character: isError ? styles.characterError : styles.character,
              characterInactive: styles['character--inactive']
            }}
          />
          <span style={{
            color: "#8C8C8C"
          }}>Не пришло письмо? Проверьте папку Спам.</span>
        </div>

      }
    />
  )
};



export default ConfirmEmailForm;
