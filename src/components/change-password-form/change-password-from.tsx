import { useRegistrationMutation } from "@api/auth/auth";
import { Input, Button, Form, Card } from "antd"
type FieldType = {
  email: string;
  password: string;
  confirm: string;
};

const ChangePasswordFrom: React.FC = () => {
  const [regUser, { data, error, isLoading }] = useRegistrationMutation();
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
  return (
    <Card
    >
      {isLoading && <span>loading</span>}
      {error && <span>error</span>}
      {data && <span>data</span>}
      <span>Восстановление аккаунта</span>
      <Form

        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            {
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              min: 8,
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
            Сохранить
          </Button>
        </Form.Item>

      </Form>
    </Card>
  )
}

export default ChangePasswordFrom