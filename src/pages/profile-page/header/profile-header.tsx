import { SettingOutlined } from "@ant-design/icons"
import { _Main, _Profile, _Settings } from "@config/constants";
import { history } from "@redux/configure-store";
import { Button, Grid } from "antd"
import { Header } from "antd/lib/layout/layout"
import { Link } from "react-router-dom";

export const ProfileHeader: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Header style={{
      height: "fit-content",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#F0F5FF"
    }}>
      <div style={{
        color: "#262626",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "26px",
      }}>
        Профиль
      </div>
      <Button
        data-test-id='header-settings'
        shape={screens?.xs ? "circle" : "default"}
        icon={screens?.lg || screens?.xs ? <SettingOutlined /> : <></>}
        style={{
          color: "#262626",
        }}
        type={screens?.xs ? "default" : "link"}
        onClick={() => { history.push(_Settings, { from: _Profile }) }}
      >
        {!screens?.xs ? "Настройки" : ''}
      </Button>
    </Header>
  )
}