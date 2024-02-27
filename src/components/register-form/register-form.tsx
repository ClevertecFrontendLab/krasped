import { GooglePlusOutlined } from "@ant-design/icons";
import { useRegistrationMutation } from "@api/auth/auth";
import { ILocationState, history } from "@redux/configure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input, Button, Form, Grid } from "antd"
import { useEffect, useState } from "react";
type FieldType = {
  email: string;
  password: string;
  confirm: string;
};

type CustomError = FetchBaseQueryError & {
  status: number;
};

export const RegisterForm: React.FC = () => {
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
    // console.log('Received values of form: ', values);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push('/result/success', { from: "login" });
    }

    if (isError) {
      const customError = error as CustomError;
      console.log(error)
      if ((customError?.status) === 409) {
        history.push('/result/error-user-exist', { from: "login" });
      } else {
        history.push('/result/error', {
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
    <>
      <Form
        form={form}
        style={{ width: "100%", paddingTop: "8px" }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item<FieldType>
          style={{ marginBottom: "32px" }}
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input data-test-id='registration-email' size="large" addonBefore={'email:'} />
        </Form.Item>
        <Form.Item<FieldType>
          extra={isValid && <span style={{ fontSize: "12px" }}>{'Пароль не менее 8 символов, с заглавной буквой и цифрой'}</span>}
          style={{ paddingBottom: screens?.xs ? 0 : "46px", marginBottom: 0 }}
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

          style={{ marginBottom: screens?.xs ? "54px" : "62px" }}
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

        <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button onClick={() => setIsValid(false)} data-test-id='registration-submit-button' size="large" style={{ width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button size="large" style={{ width: "100%" }} type="default" htmlType="button" className="login-form-button">
            <GooglePlusOutlined />
            Регистрация через гугл
          </Button>
        </Form.Item>
      </Form >
    </>
  )
}