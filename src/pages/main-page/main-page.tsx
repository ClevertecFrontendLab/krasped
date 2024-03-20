import React, { useEffect, useState } from 'react';
import { Button, Grid, Layout, Modal, Result } from 'antd';

import Main_page_light from "@assets/imgs/Main_page_light.png"

import s from './main-page.module.scss';
import { Navbar } from '@components/navbar';
import { MainHeader } from './header/main-header';
import { MainContent } from './content/main-content';
import { MainFooter } from './footer/main-footer';
import { useSelector } from 'react-redux';
import { RootState, history } from '@redux/configure-store';
import { LoaderComponent } from '@components/loader/api-loader';
import { useGetAllTriningsMutMutation } from '@redux/api/training/training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { logout } from '@redux/userSlice';
import { _AuthLogin, _Calendar, _Feedbacks } from '@config/constants';

const MainPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const [getTrainings, { isSuccess, isError, isLoading, error }] = useGetAllTriningsMutMutation();
    const [isCalendarError, setIsCalendarError] = useState(false)
    const collapsed = useSelector((state: RootState) => state.app.collapsed);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');
    const getFeedbacks = () => {
        history.push(_Feedbacks)
    }

    const getCalendar = () => getTrainings(null)

    useEffect(() => {
        if (isSuccess) {
            history.push(_Calendar)
        }
        if (isError) {
            const customError = error as { status: number }
            if (customError.status == 403) {
                dispatch(logout())
                history.push(_AuthLogin)
            }
            setIsCalendarError(true)
        }
    }, [dispatch, error, isError, isLoading, isSuccess]);
    return (
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
            <Layout style={{ position: "relative" }}>
                <LoaderComponent />
                <Modal centered footer={null} style={{ backdropFilter: 'blur(10px)' }}
                    data-test-id='modal-no-review'
                    closable={false} open={isCalendarError}
                    onCancel={() => setIsCalendarError(false)}>
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
                        subTitle="Произошла ошибка, попробуйте ещё раз."
                        extra={
                            <Button size='large' onClick={() => { setIsCalendarError(false) }} type="primary" key="console">
                                Назад
                            </Button>
                        }
                    />
                </Modal>
                <Navbar getCalendar={getCalendar} />
                <Layout className={s.layout} style={{
                    position: 'relative',
                    transition: "padding-left 0.146s linear",
                    paddingLeft: layoutPaddingLeft,
                    minHeight: "100dvh",
                    backgroundPosition: "center",
                    backgroundImage: `url(${Main_page_light})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",

                }}>
                    <MainHeader />
                    <MainContent getCalendar={getCalendar} />
                    <MainFooter getFeedbacks={getFeedbacks} />
                </Layout>
            </Layout >
        </div >
    );
};
export default MainPage;
