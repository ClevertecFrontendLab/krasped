import { IFeedback } from "@redux/api/feedback/feedback.types"
import { Content } from "antd/lib/layout/layout"
import { GooglePlusOutlined } from "@ant-design/icons";
import { _Error, _ErrorUserExist, _Success } from "@config/constants";
import { useRegistrationMutation } from "@redux/api/auth/auth";
import { ILocationState, history } from "@redux/configure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input, Button, Form, Grid, Avatar, Image, Alert } from "antd"
import { useEffect, useState } from "react";
type FieldType = {
  firstName: string,
  lastName: string,
  birthday: string,
  imgSrc: string,
  email: string;
  password: string;
  confirm: string;
};

type CustomError = FetchBaseQueryError & {
  status: number;
};


export const ProfileContent = ({ data, openFeedback }: { data: IFeedback[] | undefined, openFeedback: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isValid, setIsValid] = useState(true)
  const [form] = Form.useForm();
  const password = Form.useWatch('password', { form, preserve: true });
  const [regUser, { isLoading, isSuccess, error, isError }] = useRegistrationMutation();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = (values: FieldType) => {
    const payload = {
      email: values.email,
      password: values.password
    }
    regUser(payload)
  };

  const googleLogin = () => {
    window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
  }

  useEffect(() => {
    if (isSuccess) {
      history.push(_Success, { from: "login" });
    }

    if (isError) {
      const customError = error as CustomError;
      if ((customError?.status) === 409) {
        history.push(_ErrorUserExist, { from: "login" });
      } else {
        history.push(_Error, {
          from: "reFetchGeg",
          formState: {
            "email": form.getFieldValue("email"),
            "password": form.getFieldValue("password"),
            "confirm": form.getFieldValue("confirm"),
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    if (history?.location.state && locationState?.from && locationState?.formState) {
      form.setFieldsValue(locationState.formState)
      regUser(locationState?.formState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history?.location?.pathname]);

  useEffect(() => {
    if (form.isFieldsTouched(["password"])) {
      form.validateFields(['password']).then((res) => {
        setIsValid(true)
      })
        .catch(errorInfo => {
          setIsValid(false)
        });
    }
  }, [password])

  return (
    <Content style={{
      padding: "24px",
      boxSizing: "border-box",
      borderRadius: screens.xs ? 0 : "8px",
      backgroundColor: "white",
      display: "flex",
      height: "100%",
      overflow: 'initial',
      position: "relative",
    }}>
      <Alert
        style={{
          alignSelf: "center",
          zIndex: 2,
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
        message="Данные профиля успешно обновлены"
        type="success"
        showIcon
        closable
      />
      <Form
        form={form}
        style={{ width: "100%", maxWidth: "480px", paddingTop: "8px" }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <div
          style={{
            paddingBottom: "24px",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "21px"
          }}
        >Личная информация</div>
        <div style={{
          paddingBottom: "40px"
        }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "24px"
            }}
          >
            <div
              style={{

                border: "1px dashed #D9D9D9",
                height: "106px",
                width: "106px",

              }}
            >
              <div
                style={{
                  height: "104px",
                  width: "104px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#FAFAFA",
                  color: "#8C8C8C",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    lineHeight: "20px",
                    fontSize: "25px",
                    color: "#000000"
                  }}
                >+</span>
                <div
                  style={{
                    color: "#8C8C8C",
                    lineHeight: "18px",
                    maxWidth: "70px",
                    fontSize: "14px"
                  }}
                >Загрузить фото профиля</div>
              </div>
              {/* <Image
                style={{ transition: "width 0.5s ease-in-out, margin-top 0.5s ease-in-out" }}
                width={86}
                preview={false}
                src={''}
                alt="avatar"
              /> */}
            </div>
            <div style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              gap: "16px",
            }}>
              <Form.Item<FieldType>
                style={{ marginBottom: 0 }}
                name="firstName"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input
                  size="large"
                  placeholder="Имя" />
              </Form.Item>
              <Form.Item<FieldType>
                style={{ marginBottom: 0 }}
                name="lastName"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input
                  size="large"
                  placeholder="Фамилия" />
              </Form.Item>
              <Form.Item<FieldType>
                style={{ marginBottom: 0 }}
                name="birthday"
                hasFeedback
                rules={[{ required: true }]}
              >
                <Input
                  size="large"
                  placeholder="Дата рождения" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div style={{
          paddingBottom: "24px",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "21px"
        }}>Приватность и авторизация</div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "32px",
          paddingBottom: "54px",
        }}>
          <Form.Item<FieldType>
            style={{ marginBottom: 0 }}
            name="email"
            rules={[{ required: true }, { type: 'email' }]}
          >
            <Input data-test-id='registration-email' size="large" addonBefore={'email:'} />
          </Form.Item>
          <Form.Item<FieldType>
            extra={isValid && <span style={{ fontSize: "12px" }}>{'Пароль не менее 8 символов, с заглавной буквой и цифрой'}</span>}
            style={{ paddingBottom: 0, marginBottom: 0 }}
            name="password"
            rules={[
              {
                required: true,
                min: 8,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
              },
            ]}
            hasFeedback
          >
            <Input.Password data-test-id='registration-password' size="large" placeholder="Пароль" />
          </Form.Item>

          <Form.Item<FieldType>

            style={{ marginBottom: 0 }}
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '' },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password data-test-id='registration-confirm-password' size="large" autoComplete="new-password" placeholder="Повторите пароль" />
          </Form.Item>
        </div>

        <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button onClick={() => setIsValid(false)} data-test-id='registration-submit-button' size="large" style={{ width: screens.xs ? "100%" : "" }} type="primary" htmlType="submit" className="login-form-button">
            Сохранить изменения
          </Button>
        </Form.Item>

      </Form >
    </Content >
  )
}