import React, { useEffect, useState } from 'react';
import { Button, Form, Grid, Layout, Modal, Rate, Result } from 'antd';
import Main_page_light from "@assets/imgs/Main_page_light.png"

import { Navbar } from '@components/navbar';
import { useSelector } from 'react-redux';
import { RootState, history } from '@redux/configure-store';
import { ProfileHeader } from './header/profile-header';
import { ProfileContent } from './content/profile-content';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useAddFeedbackMutation } from '@redux/api/feedback/feedback';
import { LoaderComponent } from '@components/loader/api-loader';
import { logout } from '@redux/userSlice';
import TextArea from 'antd/lib/input/TextArea';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { IFeedbackReq } from '@redux/api/feedback/feedback.types';
import { _403, _AuthLogin, _Main } from '@config/constants';

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const rating = Form.useWatch('rating', form);
  const [isfeedbackError, setIsfeedbackError] = useState(false)
  const [isfeedbackSuccess, setIsfeedbackSuccess] = useState(false)
  const [isOpenFeedbackFrom, setIsOpenFeedbackFrom] = useState(false)

  const dispatch = useAppDispatch()
  const [addFeedbacks, { isError: addIsError, isSuccess: addSuccess, isLoading: addLoading, error: addError }] = useAddFeedbackMutation();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const sendFeedback = (values: IFeedbackReq) => addFeedbacks(values)
 

  const closeFeedbackFrom = () => {
    setIsOpenFeedbackFrom(false)
    form.resetFields();
  }

  const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');

  useEffect(() => {
    if (addSuccess) {
      setIsfeedbackSuccess(true)
    }
    if (addIsError) {
      const customError = addError as { status: number }
      if (customError.status == _403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setIsfeedbackError(true)
      setIsOpenFeedbackFrom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addLoading]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
      <Layout style={{ position: "relative" }}>
        <LoaderComponent />
        <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isfeedbackError} onCancel={() => setIsfeedbackError(false)}>
          <Result
            style={{
              maxWidth: "539px",
              width: "100%",
              margin: 0,
              padding: screens.xs ? 0 : "64px 0",
              zIndex: 1,
              backgroundColor: "white"
            }}
            status="error"
            title={<span style={{ fontWeight: 500 }}>{"Данные не сохранились"}</span>}
            subTitle={
              <>
                <span>Что то пошло не так. </span>

                <span>Попробуйте ещё раз.</span>
              </>
            }
            extra={
              <div style={{
                display: "flex", gap: "8px"
              }}>

                <Button size='large' onClick={() => { setIsfeedbackError(false); setIsOpenFeedbackFrom(true) }}
                  style={{ maxWidth: "369px", width: "100%", fontSize: "14px" }} type="primary" >
                  Написать отзыв
                </Button>
                <Button size='large' onClick={() => { setIsfeedbackError(false) }}
                  style={{ maxWidth: "369px", width: "100%", fontSize: "14px" }} type="default" >
                  Закрыть
                </Button>
              </div>
            }
          />
        </Modal>
        <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isfeedbackSuccess} onCancel={() => setIsfeedbackSuccess(false)}>
          <Result
            style={{
              maxWidth: "539px",
              width: "calc(100% - 16px)",
              margin: "16px",
              padding: screens.xs ? "32px 16px" : "64px 0",
              zIndex: 1,
              backgroundColor: "white"
            }}
            status="success"
            title={<span style={{ fontWeight: 500 }}>{"Отзыв успешно опубликован"}</span>}

            extra={
              <Button size='large' onClick={() => { setIsfeedbackSuccess(false) }} style={{ maxWidth: "369px", width: "100%" }} type="primary" >
                Отлично
              </Button>
            }
          />
        </Modal>
        <Modal

          centered
          footer={
            <div style={{
              display: "flex",
              justifyContent: (screens?.xs) ? "center" : 'end'
            }}>
              <Button htmlType='submit'
                disabled={!rating}
                size='large' onClick={() => { form.submit(); }}
                style={{ maxWidth: "369px", width: (screens?.xs) ? "100%" : "" }} type="primary" >
                Опубликовать
              </Button>
            </div>
          }
          style={{ backdropFilter: 'blur(10px)' }}
          bodyStyle={{ padding: "24px 24px 0" }}
          open={isOpenFeedbackFrom}
          title="Ваш отзыв"
          onCancel={closeFeedbackFrom}
        >
          <Form
            name="feedbackFrom"
            onFinish={sendFeedback}
            form={form}
          >
            <Form.Item
              name="rating"
              rules={[{ required: true, message: 'Поставьте оценку' }]}
            >

              <Rate
                style={{ fontSize: 19, gap: "4px" }}
                character={({ index, value }) => {
                  if (index !== undefined && value !== undefined && index < value) {
                    return <StarFilled />;
                  }
                  return <StarOutlined />;
                }}
              />
            </Form.Item>
            <Form.Item
              name="message"
            >
              <TextArea autoSize={{ minRows: 2 }} />
            </Form.Item>
          </Form>
        </Modal>
        <Navbar />
        <Layout style={{
          position: 'relative',
          transition: "padding-left 0.146s linear",
          paddingLeft: layoutPaddingLeft,
          minHeight: "100dvh",
          backgroundPosition: "center",
          backgroundImage: `url(${Main_page_light})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
          <div style={{
            height: "100dvh",
            display: "flex", width: "100%",
            flexDirection: "column",
            overflow: "auto", scrollbarWidth: "none"
          }}>
            <ProfileHeader />
            <div
              style={{
                width: "100%",
                flexGrow: 1,
                padding: screens.xs ? "24px 0 42px" : "24px 24px 42px",
              }}
            >
              <ProfileContent />
            </div>
          </div>
        </Layout>
      </Layout >
    </div>
  );
};
export default ProfilePage;
