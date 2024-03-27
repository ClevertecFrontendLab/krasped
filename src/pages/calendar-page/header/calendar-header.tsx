import { SettingOutlined } from "@ant-design/icons"
import { _Calendar, _Main, _Settings } from "@config/constants";
import { history } from "@redux/configure-store";
import { Button, Grid } from "antd"
import { Header } from "antd/lib/layout/layout"
import { Link } from "react-router-dom";

export const FeedbackHeader: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Header style={{
      height: "fit-content",
      padding: "16px 24px",
      backgroundColor: "#F0F5FF"
    }}>
      <div style={{ lineHeight: "initial" }}>
        <Button
          type="link"
          onClick={() => history.push(_Main)}
          style={{
            color: "#8C8C8C",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18.2px",
            paddingRight: "4px"
          }}
        >{"Главная /"}</Button>
        <Button
          type="link"
          disabled
          style={{
            paddingLeft: 0,
            color: "#262626",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18.2px"
          }}
        >{"Календарь"}</Button>
      </div>
      <div
        style={{
          textAlign: "end",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "18.2px"
        }}
      >

        <Button
          data-test-id='header-settings'
          shape={screens?.xs ? "circle" : "default"}
          icon={screens?.lg || screens?.xs ? <SettingOutlined /> : <></>}
          style={{
            color: "#262626",
          }}
          type={screens?.xs ? "default" : "link"}
          onClick={() => { history.push(_Settings, { from: _Calendar }) }}
        >
          {!screens?.xs ? "Настройки" : ''}
        </Button>
      </div>

    </Header>
  )
}