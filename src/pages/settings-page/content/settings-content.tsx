import { IFeedback, IFeedbackReq } from "@redux/api/feedback/feedback.types"
import { Content } from "antd/lib/layout/layout"
import { GooglePlusOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { _AuthLogin, _Error, _ErrorUserExist, _Feedbacks, _Success } from "@config/constants";
import { useRegistrationMutation } from "@redux/api/auth/auth";
import { ILocationState, history } from "@redux/configure-store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Input, Button, Form, Grid, Avatar, Image, Alert, Modal, Rate, Result } from "antd"
import { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useAddFeedbackMutation } from "@redux/api/feedback/feedback";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { logout } from "@redux/userSlice";


type CustomError = FetchBaseQueryError & {
  status: number;
};


export const SettingsContent = ({ data, openFeedback }: { data: IFeedback[] | undefined, openFeedback: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [addFeedbacks, { isError: addIsError, isSuccess: addSuccess, isLoading: addLoading, error: addError }] = useAddFeedbackMutation();
  const dispatch = useAppDispatch()
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const rating = Form.useWatch('rating', form);
  const [isOpenFeedbackFrom, setIsOpenFeedbackFrom] = useState(false)
  const [isfeedbackError, setIsfeedbackError] = useState(false)
  const [isfeedbackSuccess, setIsfeedbackSuccess] = useState(false)


  const closeFeedbackFrom = () => {
    setIsOpenFeedbackFrom(false)
    form.resetFields();
  }

  const sendFeedback = (values: IFeedbackReq) => {
    addFeedbacks(values)
  };

  useEffect(() => {
    if (addSuccess) {
      setIsfeedbackSuccess(true)
      closeFeedbackFrom()
    }
    if (addIsError) {
      const customError = addError as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setIsfeedbackError(true)
      setIsOpenFeedbackFrom(false)
      // closeFeedbackFrom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addLoading]);


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

              <Button data-test-id='write-review-not-saved-modal' size='large' onClick={() => { setIsfeedbackError(false); setIsOpenFeedbackFrom(true) }}
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
            <Button htmlType='submit' data-test-id='new-review-submit-button'
              disabled={!rating}
              size='large' onClick={() => { form.submit(); }}
              style={{ maxWidth: "369px", width: (screens?.xs) ? "100%" : "" }} type="primary" >
              Опубликовать
            </Button>
          </div>
        }
        // footer={null}
        style={{ backdropFilter: 'blur(10px)' }}
        bodyStyle={{ padding: "24px 24px 0" }}
        open={isOpenFeedbackFrom}
        title="Ваш отзыв"
        onCancel={() => closeFeedbackFrom()}
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
      <div style={{
        display: "flex",
        gap: "8px"
      }}>
        <Button data-test-id='write-review' onClick={() => setIsOpenFeedbackFrom(true)} type="primary" >
          Написать отзыв
        </Button>
        <Button data-test-id='see-reviews' type='link' onClick={() => history.push(_Feedbacks)} >
          Смотреть все отзывы
        </Button>
      </div>
    </Content >
  )
}