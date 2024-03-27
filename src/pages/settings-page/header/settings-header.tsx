import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons"
import { _Main } from "@config/constants";
import { ILocationState, history } from "@redux/configure-store";
import { Button, Grid } from "antd"
import { Header } from "antd/lib/layout/layout"
import { Link } from "react-router-dom";

export const SettingsHeader: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Header style={{
      height: "fit-content",
      padding: "16px 24px",
      display: "flex",
      backgroundColor: "#F0F5FF"
    }}>
      <div
        data-test-id='settings-back'
        onClick={() => history.push((history?.location?.state as ILocationState)?.from || '/')}
        style={{
          display: "flex",
          gap: "16px",
          cursor: "pointer"
        }}>
        <ArrowLeftOutlined style={{ fontSize: "14px" }} width={"14px"} />
        <div style={{
          color: "#262626",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "26px",
        }}>
          Настройки
        </div>
      </div>

    </Header>
  )
}