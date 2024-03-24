import React, { useEffect, useState } from 'react';
import { Button, Grid, Layout, Modal, Result } from 'antd';

import Main_page_light from "@assets/imgs/Main_page_light.png"

import { Navbar } from '@components/navbar';
import { useSelector } from 'react-redux';
import { RootState, history } from '@redux/configure-store';
import { CalendarContent } from './content/404-content';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { LoaderComponent } from '@components/loader/api-loader';
import { _AuthLogin, _Main } from '@config/constants';

const CalendarPage: React.FC = () => {


  const dispatch = useAppDispatch()
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const layoutPaddingLeft = (screens?.xs) ? '0' : (collapsed ? '64px' : '208px');




  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", position: "relative" }}>
      <Layout style={{ position: "relative" }}>
        <LoaderComponent />
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
          <div style={{ height: "100dvh", padding: screens.xs ? "24px 0 42px" : "24px 24px 42px", overflow: "auto", scrollbarWidth: "none" }}>
            <CalendarContent />
          </div>
        </Layout>
      </Layout >
    </div>
  );
};
export default CalendarPage;
