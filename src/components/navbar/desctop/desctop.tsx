import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import useWindowWidth from "@hooks/use-window-width"
import { RootState, setCollapsed } from "@redux/configure-store"
import { Menu, Button, Space, Image, Grid } from "antd"
import Sider from "antd/lib/layout/Sider"
import { useDispatch, useSelector } from "react-redux"
import LogoFullSVG from "@assets/icons/logo-full.svg"
import LogoCollapsedSVG from "@assets/icons/logo-collapsed.svg"
import IconExit from "@assets/icons/icon-exit.svg"
import { navItems } from "@config/nav-config"
import s from './desctop.module.scss';
import { Link } from "react-router-dom"


export const DesctopNavbar: React.FC = () => {
  const width = useWindowWidth()
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const collapsed = useSelector((state: RootState) => state.app.collapsed);
  const dispatch = useDispatch();

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
          left: (width > 1440) ? (((width - 1440) / 2) + "px") : 0,
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

          {navItems.map((item, index) => (
            <Menu.Item
              style={{
                height: "42px",
                margin: 0,
                padding: 0,
                paddingLeft: "0px",
                justifyContent: "center",
              }}
              key={index} className={index === navItems.length - 1 ? 'last-menu-item' : ''}>
              <Link to={item.href}>
                <span style={{
                  color: "#061178",
                  paddingRight: "10px",
                  paddingLeft: !collapsed ? "16px" : "24px",
                }}>{item.icon}</span>
                {!collapsed && item.label}
              </Link>
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

    </>
  )
}