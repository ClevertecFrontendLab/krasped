import React, { useEffect, useState } from 'react';
import { Button, Grid, Layout, Modal, Result } from 'antd';
import Main_page_light from "@assets/imgs/Main_page_light.png"

import { Navbar } from '@components/navbar';
import { useSelector } from 'react-redux';
import { RootState, history } from '@redux/configure-store';
import { TrainingHeader } from './header/training-header';
import { TrainingContent } from './content/training-content';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { LoaderComponent } from '@components/loader/api-loader';

import { _403, _AuthLogin, _Main } from '@config/constants';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { logout } from '@redux/userSlice';
import { useGetAllTriningsQuery } from '@redux/api/training/training';
import { useGetTriningListQuery } from '@redux/api/catalog/catalog';

const TrainingPage: React.FC = () => {
  const { isError, isLoading, error } = useGetAllTriningsQuery(null);
  const { refetch, isSuccess: isSuccessTrainingList, isError: isErrorTrainingList, isLoading: loadingTrainingList, error: errorTrainingList } = useGetTriningListQuery(null);

  const [isTrainingssError, setIsTrainingsError] = useState(false)
  const [isHideAddTrainingBtn, setIsHideAddTrainingBtn] = useState(false)

  const [isTrainingListError, setIsTrainingListError] = useState(false)


  const dispatch = useAppDispatch()
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');

  useEffect(() => {
    if (isError) {
      const customError = error as { status: number }
      if (customError.status == _403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setIsTrainingsError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isErrorTrainingList) {
      const customError = errorTrainingList as { status: number }
      if (customError.status == _403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setIsTrainingListError(true)
      setIsHideAddTrainingBtn(true)
    }
    if (isSuccessTrainingList) {
      setIsHideAddTrainingBtn(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTrainingList]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
      <Layout style={{ position: "relative" }}>
        <LoaderComponent />
        <Navbar />
        <Modal
          centered footer={null} style={{ backdropFilter: 'blur(10px)' }} closable={false} open={isTrainingssError} onCancel={() => setIsTrainingsError(false)}>
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
            subTitle={<span style={{ color: "#8C8C8C" }}>{"Произошла ошибка, попробуйте ещё раз."}</span>}
            extra={
              <Button
                size='large'
                onClick={() => { history.push(_Main) }}
                type="primary"
                key="console">
                Назад
              </Button>
            }
          />
        </Modal>
        <Modal centered
          footer={null}
          closeIcon={<CloseOutlined />}
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
              <div
                style={{ fontSize: "16px", lineHeight: "21px" }}>При открытии данных <br /> произошла ошибка </div>
              <div
                style={{ color: "#8C8C8C", fontSize: "14px", lineHeight: "18px" }}>Попробуйте ещё раз.</div>
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
            <TrainingHeader />
            <div
              style={{
                width: "100%",
                flexGrow: 1,
                padding: screens.xs ? "24px 0 42px" : "24px 24px 42px",
              }}
            >
              <TrainingContent isHideAddTrainingBtn={isHideAddTrainingBtn} />
            </div>
          </div>
        </Layout>
      </Layout >
    </div>
  );
};
export default TrainingPage;
