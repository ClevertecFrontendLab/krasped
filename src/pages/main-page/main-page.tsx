import React from 'react';
import { Grid, Layout } from 'antd';

import Main_page_light from "@assets/imgs/Main_page_light.png"

import s from './main-page.module.scss';
import { Navbar } from '@components/navbar';
import { MainHeader } from './header/main-header';
import { MainContent } from './content/main-content';
import { MainFooter } from './footer/main-footer';
import { useSelector } from 'react-redux';

export const MainPage: React.FC = () => {
    const collapsed = useSelector((state: any) => state.app.collapsed);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');


    return (
        <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
            <Layout style={{ position: "relative" }}>
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
                    <MainFooter />
                </Layout>
            </Layout >
        </div>
    );
};
