import { Input, Button, Form } from "antd"
type FieldType = {
  email?: string;
  password?: string;
  confirm?: string;
};

export const RegisterForm: React.FC = () => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  const onFinish = (values: FieldType) => {
    console.log('Received values of form: ', values);
  };
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
            {
              required: true,
              message: 'Please confirm your password!',
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