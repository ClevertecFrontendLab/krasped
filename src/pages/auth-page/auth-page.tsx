import { LoginForm } from "@components/login-form/login-form"
import { Card, Grid, Image, Tabs } from "antd"
import LogoFullSVG from "@assets/icons/logo-full.svg"
import { RegisterForm } from "@components/register-form/register-form"
import { useEffect, useState } from "react"
import { history } from "@redux/configure-store"

const AuthPage: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [tab, setTab] = useState("1")

  const changeTab = (tab: string): void => {
    setTab(tab);
    (tab === "2") ? history.push("/auth/registration") : history.push("/auth/login")

  };

  useEffect(() => {
    if (history?.location.pathname === "/auth") {
      history.push("/auth/login")
    } else {
      if (history?.location.pathname === "/auth/registration") { setTab("2") } else { setTab("1") }
    }
  }, [])
  return (
    <Card
      bodyStyle={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: 0 }}
      style={{
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: screens?.xs ? "32px" : "48px",
        width: screens?.xs ? 328 : 539,
        padding: screens?.xs ? "32px 16px 124px" : "64px 85.5px 150px"
      }}>
      <Image
        style={{
          marginBottom: screens?.xs ? "32px" : "48px",
        }}
        width={screens?.xs ? 203 : 309}
        preview={false}
        src={LogoFullSVG}
        alt="Logo"
      />
      <Tabs
        style={{ width: "100%" }}
        tabBarGutter={0}
        activeKey={tab}
        onChange={(val) => changeTab(val)}
        items={[
          {
            label: "Вход",
            key: '1',
            children: <LoginForm />,
          },
          {
            label: "Регистрация",
            key: '2',
            children: <RegisterForm />,
          },
        ]}
      />
    </Card>

  )
}

export default AuthPage