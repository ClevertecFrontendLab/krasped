import React, { useEffect, useState } from 'react';
import { Button, Form, Grid, Layout, Modal, Result } from 'antd';

import Main_page_light from "@assets/imgs/Main_page_light.png"

import s from './feedback-page.module.scss';
import { Navbar } from '@components/navbar';
import { useSelector } from 'react-redux';
import { RootState, history } from '@redux/configure-store';
import { FeedbackHeader } from './header/calendar-header';
import { CalendarContent } from './content/calendar-content';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { LoaderComponent } from '@components/loader/api-loader';
import { logout } from '@redux/userSlice';
import { useAddTrainingMutation, useGetAllTriningsQuery } from '@redux/api/training/training';
import { selectTrainings } from '@redux/trainingSlice';

const CalendarPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isfeedbacksError, setIsfeedbacksError] = useState(false)
  const [isfeedbackSuccess, setIsfeedbackSuccess] = useState(false)
  const trainings = useAppSelector(selectTrainings)
  const dispatch = useAppDispatch()
  const { isError, isLoading, error } = useGetAllTriningsQuery(null, { skip: !!trainings?.length });
  // const [addFeedbacks, { isError: addIsError, isSuccess: addSuccess, isLoading: addLoading, error: addError }] = useAddTrainingMutation();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');

  useEffect(() => {
    if (isError) {
      const customError = error as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push("/auth/login")
      }
      setIsfeedbacksError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
      <Layout style={{ position: "relative" }}>
        <LoaderComponent />
        <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isfeedbacksError} onCancel={() => setIsfeedbacksError(false)}>
          <Result
            style={{
              maxWidth: "539px",
              width: "calc(100% - 16px)",
              margin: "16px",
              padding: screens.xs ? "32px 16px" : "64px 0",
              zIndex: 1,
              backgroundColor: "white"
            }}
            title={<span style={{ fontWeight: 500 }}>{"Что-то пошло не так"}</span>}
            status="500"
            subTitle="Произошла ошибка, попробуйте еще раз."
            extra={
              <Button size='large' onClick={() => { history.push('/main') }} type="primary" key="console">
                Назад
              </Button>
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
          <div style={{ height: (screens?.xs) ? "calc(100dvh - 186px)" : "calc(100dvh - 220px)", overflow: "auto", scrollbarWidth: "none" }}>
            <FeedbackHeader />
            <CalendarContent data={trainings} />
          </div>
          {(!!trainings?.length) && <div style={{
            padding: (screens?.xs) ? "16px 16px 42px" : "20px 24px 48px",
            height: (screens?.xs) ? "186px" : "220px"
          }} >
          </div>}
        </Layout>
      </Layout >
    </div>
  );
};
export default CalendarPage;
