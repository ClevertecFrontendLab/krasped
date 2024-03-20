import { SettingOutlined } from "@ant-design/icons"
import { _Main } from "@config/constants";
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
      display: "flex",
      backgroundColor: "#F0F5FF"
    }}>
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
      >{"Отзывы пользователей"}</Button>

    </Header>
  )
}