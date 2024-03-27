import { Content } from "antd/lib/layout/layout"
import { _Error, _ErrorUserExist, _Success } from "@config/constants";
import { history } from "@redux/configure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input, Button, Form, Grid, Image, Alert, Upload, DatePicker, Modal } from "antd"
import React, { useEffect, useState } from "react";
import { selectToken, selectUser } from "@redux/userSlice";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import dayjs from "dayjs";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import CalenderSVG from "@assets/icons/calendat-disabled.svg"
import { useUpdateUserMutation } from "@redux/api/user/user";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
type FieldType = {
  firstName: string,
  lastName: string,
  birthday?: string,
  imgSrc: string,
  email: string;
  password: string;
  confirm: string;
};

type CustomError = FetchBaseQueryError & {
  status: number;
};
interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const ProfileContent = () => {
  const [fields, setFields] = useState<FieldData[]>();
  const token = useAppSelector(selectToken);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [isValid, setIsValid] = useState(true)
  const [isSuccessSaved, setIsSuccessSaved] = useState(false)
  const [isErrorSaved, setIsErrorSaved] = useState(false)
  const [isBigImage, setIsBigImage] = useState(false)
  // const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isLoadingImageError, setIsLoadingImageError] = useState(false)
  const [imgUrl, setImgUrl] = useState<string>()
  const [form] = Form.useForm();
  const password = Form.useWatch('password', { form, preserve: true });
  const user = useAppSelector(selectUser)
  const Icon = React.createElement(Image, {
    src: CalenderSVG,
    preview: false,
    alt: CalenderSVG,
  })

  const [updateUser, { isLoading, isSuccess, error, isError }] = useUpdateUserMutation();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  // const state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: [
  //     {
  //       uid: '-1',
  //       name: 'image.png',
  //       status: 'done',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //   ]
  // }

  const handleChange = (info: UploadChangeParam<UploadFile>): void => {
    if (info.file.status === 'uploading') {
      // setIsLoadingImage(true);
      setIsLoadingImageError(false);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, () => {
        // setIsLoadingImage(false);
        setImgUrl(info?.file?.response?.url);
      }
      );
    }
    if (info.file.status === 'error') {
      // setIsLoadingImage(false);
      setIsLoadingImageError(true);
      setImgUrl(info?.file?.response?.url);
    }
  };

  const onFinish = (values: FieldType) => {


    const payload = {
      email: values.email,
      ...(values?.password ? { password: values.password } : {}),
      ...(values?.birthday ? { birthday: values.birthday } : {}),
      firstName: values.firstName,
      lastName: values.lastName,
      // birthday: values.birthday, //"2024-03-26T20:59:15.136Z",
      imgSrc: imgUrl,
      // readyForJointTraining: true,
      // sendNotification: true
    }
    updateUser(payload)
  };



  function getBase64(img: RcFile | undefined, callback: (item: string | ArrayBuffer | null) => void) {
    if (!img) return
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const uploadButton = (
    <>
      {screens.xs ?
        <div style={{display: "flex", width: "100%"}}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              color: "#8C8C8C",
              lineHeight: "18px",
              fontSize: "14px"
            }}
          >Загрузить фото профиля</div>
          <Button size="large" icon={<UploadOutlined />}>Загрузить</Button>
        </div>
        :
        <div>
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
      }

    </>

  );

  function beforeUpload(file: { type: string; size: number; }) {
    setIsBigImage(true)
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   console.error('You can only upload JPG/PNG file!');
    //   return
    // }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      setIsLoadingImageError(true);
      return
    } else{setIsBigImage(false)}
    return isLt5M || Upload.LIST_IGNORE;
  }

  const resetFields = () => {
    setFields([
      { name: ['firstName'], value: user?.firstName ?? '' },
      { name: ['lastName'], value: user?.lastName ?? '' },
      { name: ['birthday'], value: dayjs(user?.birthday) ?? null },
      { name: ['email'], value: user?.email ?? '' },

    ])
  }

  useEffect(() => {
    if (isSuccess) {
      setIsSuccessSaved(true)
      // history.push(_Success, { from: "login" });
    }

    if (isError) {
      resetFields()
      const customError = error as CustomError;
      if ((customError?.status) === 409) {
        history.push(_ErrorUserExist, { from: "login" });
      } else {
        setIsErrorSaved(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);



  useEffect(() => {
    console.log(user)
    setImgUrl(user?.imgSrc ? user?.imgSrc : undefined)
    setFields([
      { name: ['firstName'], value: user?.firstName ?? '' },
      { name: ['lastName'], value: user?.lastName ?? '' },
      { name: ['birthday'], value: dayjs(user?.birthday) ?? null },
      { name: ['email'], value: user?.email ?? '' },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    console.log(user)
    setImgUrl(user?.imgSrc ? user?.imgSrc : undefined)
    setFields([
      { name: ['firstName'], value: user?.firstName ?? '' },
      { name: ['lastName'], value: user?.lastName ?? '' },
      { name: ['birthday'], value: dayjs(user?.birthday) ?? null },
      { name: ['email'], value: user?.email ?? '' },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.isFieldsTouched(["password"])) {
      form.validateFields(['password']).then(() => {
        setIsValid(true)
      })
        .catch(() => {
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
      {isBigImage && <Modal centered
        footer={null}
        closable={false}
        bodyStyle={{ padding: "16px 24px" }}
        style={{ maxWidth: "384px", backdropFilter: 'blur(10px)' }}
        open={isBigImage}
        onCancel={() => { setIsBigImage(false) }}>
        <div style={{ alignItems: "flex-start", display: "flex", width: "100%", gap: "16px" }}>
          <CloseCircleOutlined
            style={{
              color: "red",
              fontSize: "22px"
            }} />
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div
              style={{ fontSize: "16px", lineHeight: "21px" }}>Файл слишком большой</div>
            <div
              style={{ color: "#8C8C8C", fontSize: "14px", lineHeight: "18px" }}>Выберите файл размером до 5 МБ</div>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
              <Button
                data-test-id='big-file-error-close'
                style={{
                  fontSize: "14px",
                  height: "28px",
                  lineHeight: "18px"
                }}
                onClick={() => {
                  setIsBigImage(false)
                }} type="primary" key="console">
                Закрыть
              </Button>
            </div>
          </div>
        </div>

      </Modal>}
      <Modal centered
        footer={null}
        closable={false}
        bodyStyle={{ padding: "16px 24px" }}
        style={{ maxWidth: "384px", backdropFilter: 'blur(10px)' }}
        open={isErrorSaved}
        onCancel={() => { setIsErrorSaved(false) }}>
        <div style={{ alignItems: "flex-start", display: "flex", width: "100%", gap: "16px" }}>
          <CloseCircleOutlined
            style={{
              color: "red",
              fontSize: "24px"
            }} />
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div
              style={{ fontSize: "16px", lineHeight: "21px" }}>
              При сохранении данных произошла ошибка
            </div>
            <div
              style={{ color: "#8C8C8C", fontSize: "14px", lineHeight: "18px" }}>
              Придётся попробовать ещё раз
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
              <Button
                style={{
                  fontSize: "14px",
                  height: "28px",
                  lineHeight: "18px"
                }}
                onClick={() => {
                  setIsErrorSaved(false)
                }} type="primary" key="console">
                Закрыть
              </Button>
            </div>
          </div>
        </div>

      </Modal>
      {isSuccessSaved && <Alert
        data-test-id='alert'
        style={{
          alignSelf: "center",
          zIndex: 2,
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
        onClose={() => setIsSuccessSaved(false)}
        message="Данные профиля успешно обновлены"
        type="success"
        showIcon
        closable
      />}
      <Form
        form={form}
        fields={fields}
        onFieldsChange={(_, allFields) => {
          setFields(allFields);
        }}
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
              flexDirection: screens.xs ? "column-reverse" : "row",
              width: "100%",
              gap: "24px"
            }}
          >
          <Form.Item
                data-test-id='profile-avatar'
            >
            {!!user?.email && (screens.xs ?
              <Upload
                method="post"
                style={{width: "100%"}}
                maxCount={1}
                onPreview={() => {}}
                name="file"
                defaultFileList={user?.imgSrc ? [
                  {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url:  user.imgSrc.includes('https') ? user.imgSrc : `https://training-api.clevertec.ru/${user.imgSrc}`,
                  },
                ] : []}
                action="https://marathon-api.clevertec.ru/upload-image"
                headers={
                  { 'Authorization': `Bearer ${token}` }
                }
                onRemove={() => setImgUrl(undefined)}
                withCredentials={true}
                supportServerRender={false}
                listType="picture"
                onChange={handleChange}
                beforeUpload={beforeUpload}
              >
                {imgUrl ? null : uploadButton}
              </Upload>
              : <Upload
                method="post"
                maxCount={1}
                onPreview={() => {}}
                name="file"
                defaultFileList={user?.imgSrc ? [
                  {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: user.imgSrc.includes('https') ? user.imgSrc : `https://training-api.clevertec.ru/${user?.imgSrc}`,
                  },
                ] : []}
                action="https://marathon-api.clevertec.ru/upload-image"
                headers={
                  { 'Authorization': `Bearer ${token}` }
                }
                onRemove={() => setImgUrl(undefined)}
                withCredentials={true}
                supportServerRender={false}
                listType="picture-card"
                onChange={handleChange}
                beforeUpload={beforeUpload}
              >
                {/* {firstImageUrl ? (
                  <img src={firstImageUrl} alt="First Image" style={{ width: '100px', height: '100px' }} />
                ) : (
                  imgUrl || isLoadingImage ? null : uploadButton
                )} */}
                {imgUrl ? null : uploadButton}
              </Upload>)}
              </Form.Item>
            <div
              style={{

                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: "16px",
              }}>
              <Form.Item<FieldType>
                style={{ marginBottom: 0 }}
                name="firstName"
                 
              >
                <Input
                  data-test-id='profile-name'
                  size="large"
                  placeholder="Имя" />
              </Form.Item>
              <Form.Item<FieldType>
                style={{ marginBottom: 0 }}
                name="lastName"
                 
              >
                <Input
                  data-test-id='profile-surname'
                  size="large"
                  placeholder="Фамилия" />
              </Form.Item>
              <Form.Item<FieldType>
                style={{ marginBottom: 0 }}
                name="birthday"
                 
              >
                <DatePicker
                  data-test-id='profile-birthday'
                  suffixIcon={Icon}
                  allowClear={false}
                  style={{ width: "100%" }}
                  size="large"
                  placeholder={"Дата рождения"}
                  format={'DD.MM.YYYY'} />
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
            <Input data-test-id='profile-email' size="large" addonBefore={'email:'} />
          </Form.Item>
          <Form.Item<FieldType>
            extra={isValid && <span style={{ fontSize: "12px" }}>{'Пароль не менее 8 символов, с заглавной буквой и цифрой'}</span>}
            style={{ paddingBottom: 0, marginBottom: 0 }}
            name="password"
            rules={[
              ({ getFieldValue }) => ({
                required: !!getFieldValue('password'),
                min: 8,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
              }),
            ]}
             
          >
            <Input.Password data-test-id='profile-password' size="large" placeholder="Пароль" />
          </Form.Item>

          <Form.Item<FieldType>

            style={{ marginBottom: 0 }}
            name="confirm"
            dependencies={['password']}
             
            rules={[
              ({ getFieldValue }) => ({
                required: !!getFieldValue('password'),
                message: ''
              }),

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
            <Input.Password data-test-id='profile-repeat-password' size="large" autoComplete="new-password" placeholder="Повторите пароль" />
          </Form.Item>
        </div>

        <Form.Item<FieldType> style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button
            data-test-id='profile-submit'
            disabled={
              isLoadingImageError ||
              !form.isFieldsTouched()
            } onClick={() => setIsValid(false)} size="large" style={{ width: screens.xs ? "100%" : "" }} type="primary" htmlType="submit" className="login-form-button">
            Сохранить изменения
          </Button>
        </Form.Item>

      </Form >
    </Content >
  )
}