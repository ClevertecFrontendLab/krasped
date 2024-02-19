import { Input, Checkbox, Button, Form } from "antd";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export const LoginForm: React.FC = () => {

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
          // label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Забыли пароль
            </a>
          </div>
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