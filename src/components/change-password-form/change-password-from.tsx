import { _ErrorChangePassword, _Root, _SuccessChangePassword } from "@config/constants";
import { useChangePasswordMutation, useRegistrationMutation } from "@redux/api/auth/auth";
import { ILocationState, history } from "@redux/configure-store";
import { Input, Button, Form, Card } from "antd"
import { useEffect, useState } from "react";
type FieldType = {
  password: string;
  confirmPassword: string;
};

const ChangePasswordFrom: React.FC = () => {
  const [changePassword, { isLoading, isSuccess, isError }] = useChangePasswordMutation();
  const [form] = Form.useForm();
  const password = Form.useWatch('password', { form, preserve: true });
  const [isValid, setIsValid] = useState(true)
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = (values: FieldType) => {
    const payload = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    }
    changePassword(payload)
  };
  useEffect(() => {
    if (isSuccess) {
      history.push(_SuccessChangePassword, { from: "login" });
    }

    if (isError) {
      history.push(_ErrorChangePassword, {
        from: "reFetchChangePass",
        formState: {
          "password": form.getFieldValue("password"),
          "confirmPassword": form.getFieldValue("confirmPassword"),
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  useEffect(() => {
    const locationState = history?.location?.state as ILocationState;
    if (history?.location.state && locationState?.from && locationState?.formState) {
      if (locationState?.from === "reFetchChangePass") {
        form.setFieldsValue(locationState.formState)
        changePassword(locationState?.formState)
      }
    } else {
      history.push(_Root)
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
    <Card
      style={{
        width: "539px"
      }}
    >
      <span style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: 500,
        marginBottom: "32px"
      }}>Восстановление аккаунта</span>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >

        <Form.Item<FieldType>
          extra={isValid && <span style={{ fontSize: "12px" }}>{'Пароль не менее 8 символов, с заглавной буквой и цифрой'}</span>}
          style={{ paddingBottom: "22px", marginBottom: 0 }}
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
          <Input.Password data-test-id='change-password' size="large" placeholder="Пароль" />
        </Form.Item>

        <Form.Item<FieldType>

          style={{ marginBottom: "62px" }}
          name="confirmPassword"
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
          <Input.Password data-test-id='change-confirm-password' size="large" autoComplete="new-password" placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button onClick={() => setIsValid(false)} data-test-id='change-submit-button' size="large" style={{ width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
            Сохранить
          </Button>
        </Form.Item>

      </Form>
    </Card>
  )
}

export default ChangePasswordFrom