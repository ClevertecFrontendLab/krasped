import React, { useState } from 'react';
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
// import { useGetMeQuery } from '@api/user/user';

const MainPage: React.FC = () => {
    // const { data, error, isLoading, refetch } = useGetMeQuery();
    const [isfeedbacksError, setIsfeedbacksError] = useState(false)
    const collapsed = useSelector((state: RootState) => state.app.collapsed);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');
    const getFeedbacks = () =>{
        history.push("/feedbacks")
    }
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
                <Navbar />
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
                    <MainContent />
                    <MainFooter getFeedbacks={getFeedbacks} />
                </Layout>
            </Layout >
        </div >
    );
};
export default MainPage;
