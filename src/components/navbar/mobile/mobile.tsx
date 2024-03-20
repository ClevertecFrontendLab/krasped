import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { Button, Space, Menu, Image, Grid, Drawer } from "antd"
import { RootState, history, setCollapsed } from "@redux/configure-store";
import { useSelector } from "react-redux";
import { navItems } from "@config/nav-config";
import LogoFullSVG from "@assets/icons/logo-full.svg"
import { logout } from "@redux/userSlice";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks";
import { useEffect, useState } from "react";

export const MobileNavbar = (props: { getCalendar?: () => void }) => {
  const [curKey, setCurKey] = useState<string>('')

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const dispatch = useAppDispatch();

  const setNavCollapsed = (value: boolean) => {
    dispatch(setCollapsed(value));
  };

  useEffect(() => {
    const key = navItems.find((item) => history?.location.pathname.includes(item.key)
    )
    setCurKey(key?.key || '')
  }, [navItems, history?.location.pathname])

  return (
    <>
      <div
        style={{
          display: (screens.xs) ? "block" : "none",
          width: 0,
          overflow: "visible",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100dvh",
          zIndex: "102"
        }}
      >
        <Button
          data-test-id='sider-switch-mobile'
          type="text"
          onClick={() => setNavCollapsed(!collapsed)}
          style={{
            zIndex: 101,
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
            selectedKeys={[curKey]}
            theme="light" mode="inline" >
            {navItems.map((item, index) => (
              <Menu.Item
                style={{
                  height: "42px",
                  margin: 0,
                  padding: 0,
                }}
                onClick={() => { typeof props?.getCalendar == "function" ? props?.getCalendar() : '' }}
                key={item.key} className={index === navItems.length - 1 ? 'last-menu-item' : ''}>
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
            onClick={() => { dispatch(logout()); history.push("/auth/login") }}
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