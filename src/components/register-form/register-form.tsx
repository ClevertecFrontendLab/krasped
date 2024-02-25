import { useRegistrationMutation } from "@api/auth/auth";
import { history } from "@redux/configure-store";
import { Input, Button, Form } from "antd"
import { useEffect } from "react";
type FieldType = {
  email: string;
  password: string;
  confirm: string;
};

export const RegisterForm: React.FC = () => {
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
      history.push('/verifyemail');
    }

    if (isError) {
      console.log(error);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item<FieldType>
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input size="large" addonBefore={'email:'} />
        </Form.Item>
        <Form.Item<FieldType>
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item<FieldType>
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            {
              min: 8,
              message: 'Пароль должен быть не менее 8 символов'
            },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: 'Пароль должен содержать как минимум 1 цифру, 1 латинскую строчную и одну заглавную букву'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Повторите пароль" />
        </Form.Item>

        <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button style={{ width: "100%" }} type="primary" htmlType="button" className="login-form-button">
            Войти через гугл
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}