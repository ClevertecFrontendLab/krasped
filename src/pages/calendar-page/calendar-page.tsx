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
import { selectTrainings, setIsShowCalendarDate } from '@redux/trainingSlice';
import dayjs from 'dayjs';
import { useGetTriningListQuery } from '@redux/api/catalog/catalog';
import { CloseCircleOutlined } from '@ant-design/icons';

const CalendarPage: React.FC = () => {
  // const [form] = Form.useForm();
  const trainings = useAppSelector(selectTrainings)
  const [isTrainingssError, setIsTrainingsError] = useState(false)
  const [isTrainingListError, setIsTrainingListError] = useState(false)
  // const [isfeedbackSuccess, setIsfeedbackSuccess] = useState(false)

  const dispatch = useAppDispatch()
  const { isError, isLoading, error } = useGetAllTriningsQuery(null, { skip: !!trainings?.length });
  const { refetch, isSuccess: isSuccessTrainingList, isError: isErrorTrainingList, isLoading: loadingTrainingList, error: errorTrainingList } = useGetTriningListQuery(null);
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
      setIsTrainingsError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isErrorTrainingList) {
      const customError = errorTrainingList as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push("/auth/login")
      }
      setIsTrainingListError(true)
      dispatch(setIsShowCalendarDate(false))
    }
    if (isSuccessTrainingList) {
      dispatch(setIsShowCalendarDate(true))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTrainingList]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
      <Layout style={{ position: "relative" }}>
        <LoaderComponent />
        <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isTrainingssError} onCancel={() => setIsTrainingsError(false)}>
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

        <Modal centered
          footer={null}
          bodyStyle={{ padding: "16px 24px" }}
          style={{ maxWidth: "384px", backdropFilter: 'blur(10px)' }}
          open={isTrainingListError}
          onCancel={() => setIsTrainingListError(false)}>
          <div style={{ alignItems: "flex-start", display: "flex", width: "100%", gap: "16px" }}>
            <CloseCircleOutlined
              style={{

                color: "#2F54EB",
                fontSize: "24px"
              }} />
            <div style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
              <div style={{ fontSize: "16px", lineHeight: "21px" }}>При открытии данных <br /> произошла ошибка </div>
              <div style={{ color: "#8C8C8C", fontSize: "14px", lineHeight: "18px" }}>Попробуйте ещё раз.</div>
              <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                <Button
                  style={{
                    fontSize: "14px",
                    height: "28px",
                    lineHeight: "18px"
                  }}
                  onClick={() => { refetch() }} type="primary" key="console">
                  Обновить
                </Button>
              </div>
            </div>
          </div>

        </Modal>

        {/* <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isfeedbackSuccess} onCancel={() => setIsfeedbackSuccess(false)}>
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
        </Modal> */}

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
          <div style={{ height: "100dvh", overflow: "auto", scrollbarWidth: "none" }}>
            <FeedbackHeader />
            <CalendarContent />
          </div>
        </Layout>
      </Layout >
    </div>
  );
};
export default CalendarPage;
