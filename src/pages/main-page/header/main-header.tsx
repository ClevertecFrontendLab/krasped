import { SettingOutlined } from "@ant-design/icons"
import { Button, Grid } from "antd"
import { Header } from "antd/lib/layout/layout"

export const MainHeader: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Header style={{
      height: "fit-content",
      padding: "16px 24px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#F0F5FF"
    }}>
      <div
        style={{
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "18.2px"
        }}
      >Главная</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "8px",
        }}
      >
        <div
          style={{
            fontWeight: screens?.lg ? 700 : 500,
            fontSize: screens?.lg ? "38px" : (screens?.xs ? "20px" : "24px"),
            display: "flex",
            padding: "6px 0",
            flexDirection: "column",
            lineHeight: screens?.lg ? "49.4px" : "31.2px"
          }}
        >

          <p>
            {"Приветствуем тебя в CleverFit — приложении,"}
          </p>
          <p>
            {"которое поможет тебе добиться своей мечты!"}
          </p>
        </div>
        <div
          style={{
            width: screens?.xs ? "fit-content" : "129px",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18.2px"
          }}
        >

          <Button
            shape={screens?.xs ? "circle" : "default"}
            icon={screens?.lg || screens?.xs ? <SettingOutlined /> : <></>}
            style={{
              color: "#262626",
            }}
            type={screens?.xs ? "default" : "link"}
          >
            {!screens?.xs ? "Настройки" : ''}
          </Button>
        </div>
      </div>
    </Header>
  )
}