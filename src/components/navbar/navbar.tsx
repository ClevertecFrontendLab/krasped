import { Button, Drawer, Grid, Image, Layout, Menu, Space } from 'antd';
import {
  CalendarOutlined,
  HeartFilled,
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TrophyFilled,

} from '@ant-design/icons';
import React, { ReactNode } from 'react';
import LogoFullSVG from "@assets/icons/logo-full.svg"
import LogoCollapsedSVG from "@assets/icons/logo-collapsed.svg"
import CalenderSVG from "@assets/icons/icon-calendar.svg"
import IconExit from "@assets/icons/icon-exit.svg"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCollapsed } from '@redux/configure-store';
import s from './navbar.module.scss';

export const Navbar = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const dispatch = useDispatch();

  const { Sider } = Layout;


  const navItems = [
    {
      icon: CalenderSVG,
      name: 'Календарь',
      href: '',
    },
    {
      icon: HeartFilled,
      name: 'Тренировки',
      href: '',
    },
    {
      icon: TrophyFilled,
      name: 'Достижения',
      href: '',
    },
    {
      icon: IdcardOutlined,
      name: 'Профиль',
      href: '',
    },
  ]

  const items = navItems.map(
    (item, index) => ({
      key: String(index + 1),
      icon: (item?.icon !== CalenderSVG) ? React.createElement(item.icon) : React.createElement(Image, {
        src: item.icon,
        alt: 'Calendar',
      }),
      label: item.name,
    }),
  );


  const setNavCollapsed = (value: boolean) => {
    dispatch(setCollapsed(value));
  };

  return (
    <>
      <Sider
        trigger={null}
        width={208}
        collapsed={collapsed}
        collapsedWidth="64"
        collapsible
        style={{
          display: (!screens?.xs) ? "block" : "none",
          backgroundColor: "white",
          overflow: "visible",
          height: '100dvh',
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000
        }}
      >
        <div
          style={{ display: "flex", width: "100%", height: "144px", justifyContent: "center" }}
        >

          {collapsed ?
            <Image
              style={{ marginTop: "52px", transition: "width 0.5s ease-in-out, margin-top 0.5s ease-in-out" }}
              width={29}
              preview={false}
              src={LogoCollapsedSVG}
              alt="Logo"
            />
            :
            <Image
              style={{ marginTop: "44px", transition: "width 0.5s ease-in-out, margin-top 0.5s ease-in-out" }}

              width={133}
              preview={false}
              src={LogoFullSVG}
              alt="Logo"
            />
          }
        </div>
        <Menu
          className={s.icons}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          theme="light" mode="inline" defaultSelectedKeys={['0']}>

          {items.map((item, index) => (
            <Menu.Item
              style={{
                height: "42px",
                margin: 0,
                padding: 0,
                paddingLeft: "0px",
                justifyContent: "center",
              }}
              key={index} className={index === items.length - 1 ? 'last-menu-item' : ''}>
              <span style={{
                color: "#061178",
                paddingRight: "10px",
                paddingLeft: !collapsed ? "16px" : "24px",
              }}>{item.icon}</span>
              {!collapsed && item.label}
            </Menu.Item>
          ))}
        </Menu>
        <Button
          style={{
            paddingLeft: "16px",
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            color: "#262626"
          }}
          type='link'
        >
          <Image
            width={14}
            preview={false}
            src={IconExit}
            alt="Exit"
          />
          <span style={{
            paddingLeft: "25px",
            display: collapsed ? "none" : "block",
          }}>
            Выход
          </span>
        </Button>
        <Button
          data-test-id='sider-switch'
          type="text"
          onClick={() => setNavCollapsed(!collapsed)}
          style={{
            zIndex: 1001,
            position: "absolute",
            right: "-20px",
            top: 'calc(50vh - 64px - 24px)',
            fontSize: '16px',
            padding: 0,
            width: "0",
            borderLeft: "20px solid white",
            borderBottom: "5px solid transparent",
            borderTop: "5px solid transparent",
            height: 66,
          }}
        >
          <Space style={{ position: "relative", left: "-18px" }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Space>
        </Button>
      </Sider>
      <div
        style={{
          display: (screens.xs) ? "block" : "none",
          width: 0,
          overflow: "visible",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100dvh",
          zIndex: "1002"
        }}


      >
        <Button
          data-test-id='sider-switch-mobile'
          type="text"
          onClick={() => setNavCollapsed(!collapsed)}
          style={{
            zIndex: 1001,
            position: "absolute",
            left: collapsed ? "0" : "105px",
            top: '24px',
            fontSize: '16px',
            padding: 0,
            width: "0",
            borderLeft: "32px solid white",
            borderBottom: "5px solid transparent",
            borderTop: "5px solid transparent",
            height: 48,
          }}
        >
          <Space style={{ position: "relative", left: "-24px" }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Space>
        </Button>
        <Drawer
          mask={false}
          style={{
            display: (screens?.xs) ? "block" : "none",
          }}
          placement={"left"}
          closable={false}
          onClose={() => setNavCollapsed(false)}
          open={!collapsed}
          key={"left"}
          width={106}
          bodyStyle={{
            padding: "0 8px",
          }}

        >
          <Image
            style={{ margin: "16px 9px" }}
            width={72}
            preview={false}
            src={LogoFullSVG}
            alt="Logo"
          />
          <Menu
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              border: 0
            }}
            theme="light" mode="inline" defaultSelectedKeys={['new']} >
            {items.map((item, index) => (
              <Menu.Item
                style={{
                  height: "42px",
                  margin: 0,
                  padding: 0,
                }}
                key={index} className={index === items.length - 1 ? 'last-menu-item' : ''}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
          <Button
            style={{
              width: "106px",
              paddingLeft: "24px",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              color: "black"
            }}
            type='link'
          >
            <span style={{
              display: collapsed ? "none" : "block",
            }}>
              Выход
            </span>
          </Button>
        </Drawer>
      </div>
    </>
  )
}