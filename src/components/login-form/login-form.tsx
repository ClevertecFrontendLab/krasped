import { GooglePlusOutlined } from "@ant-design/icons";
import { useCheckEmailMutation, useLoginMutation } from "@redux/api/auth/auth";
import { ILocationState, history } from "@redux/configure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input, Checkbox, Button, Form } from "antd";
import { useEffect } from "react";

export type FieldType = {
  email: string;
  password: string;
  isRememberMe: boolean;
};

type CustomError = FetchBaseQueryError & {
  status: number,
  data: {
    message: string,
    statusCode: number,
  }
}

export const LoginForm = () => {
  const [form] = Form.useForm();
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const [postForgotPassword, { isLoading: isLoading1, isError: isError1, error: error1, isSuccess: isSuccess1 }] = useCheckEmailMutation();
  const validateMessages = {
    required: '',
    types: {
      email: 'Не валидный емейл',
    },
  };

  function OnFinish(values: FieldType) {
    loginUser(values)
  }

  const googleLogin = () => {
    window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
  }

  function forgotPassword() {
    form.validateFields(['email']).then((res) => {
      postForgotPassword(res)
    })
      .catch(errorInfo => {/*empty*/});
  }

  useEffect(() => {
    if (isSuccess) {
      history.push("/");
    }
    if (isError) {
      history.push("/result/error-login", { from: "login" });
    }
  },
    [isError, isLoading, isSuccess]);

  useEffect(() => {
    if (isSuccess1) {
      history.push("/auth/confirm-email",
        {
          from: "login",
          formState: {
            "email": form.getFieldValue("email"),
          }
        }
      );
    }
    if (isError1) {
      const customError = error1 as CustomError;
      if (customError?.status === 404 && customError?.data?.message === "Email не найден") {
        history.push("/result/error-check-email-no-exist", { from: "login" });
      } else {
        history.push("/result/error-check-email", {
          from: "reFetchCheck",
          formState: {
            "email": form.getFieldValue("email"),
          }
        });
      }
    }
  },
    [error1, form, isError1, isLoading1, isSuccess1]);

  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    if (history?.location.state && locationState?.from && locationState?.formState) {
      form.setFieldsValue(locationState.formState)
      postForgotPassword(locationState?.formState)
    }
  }, [form, postForgotPassword]);
  return (
    <Form
      form={form}
      style={{ width: "100%", paddingTop: "8px" }}
      name="normal_login"
      className="login-form"
      initialValues={{ isRememberMe: false }}
      onFinish={OnFinish}
      validateMessages={validateMessages}
    >
      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input data-test-id='login-email' size="large" addonBefore={'email:'} />
      </Form.Item>
      <Form.Item<FieldType>
        style={{ marginTop: "8px" }}
        name="password"
        rules={[
          {
            required: true,
            min: 8,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
          },
        ]}
      >
        <Input.Password data-test-id='login-password' placeholder="Пароль" size="large" />
      </Form.Item>

      <Form.Item>
        <div style={{ paddingTop: "30px", display: "flex", justifyContent: "space-between" }}>

          <Form.Item name="isRememberMe" valuePropName="checked" noStyle>
            <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
          </Form.Item>
          <Button data-test-id='login-forgot-button' onClick={() => forgotPassword()} style={{ fontSize: "16px" }} type='link' >
            Забыли пароль?
          </Button>

        </div>
      </Form.Item>

      <Form.Item style={{ marginBottom: "16px", display: "flex", flexDirection: "column", width: "100%" }}>
        <Button data-test-id='login-submit-button' size="large" style={{ fontSize: "16px", width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
      </Form.Item>
      <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Button onClick={() => googleLogin()} size="large" style={{ fontSize: "16px", width: "100%" }} type="default" htmlType="button" className="login-form-button">
          <GooglePlusOutlined />
          Войти через гугл
        </Button>
      </Form.Item>
    </Form>
  )
}