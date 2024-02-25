import { useLoginMutation } from "@api/auth/auth";
import { history } from "@redux/configure-store";
import { Input, Checkbox, Button, Form } from "antd";
import { useEffect } from "react";

export type FieldType = {
  email: string;
  password: string;
  isRememberMe: boolean;
};

export const LoginForm = () => {
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  function OnFinish(values: FieldType) {


    loginUser(values)

    console.log('Received values of form: ', values);
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("isSuccess")
      history.push("/");
    }
    if (isError) { /* empty */ }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]);
  return (
    <>
      <Form
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
          <Input size="large" addonBefore={'email:'} />
        </Form.Item>
        <Form.Item<FieldType>
          // label="Password"
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            {
              min: 8,
              message: 'Пароль должен быть не менее 8 символов'
            },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: 'Пароль должен содержать как минимум 1 цифру, 1 латинскую строчную и одну заглавную букву'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <Form.Item name="isRememberMe" valuePropName="checked" noStyle>
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