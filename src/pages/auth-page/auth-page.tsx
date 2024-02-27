import { LoginForm } from "@components/login-form/login-form"
import { Card, Grid, Image, Tabs } from "antd"
import LogoFullSVG from "@assets/icons/logo-full.svg"
import { RegisterForm } from "@components/register-form/register-form"
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
import { history } from "@redux/configure-store"

const AuthPage: React.FC = () => {
  const { useBreakpoint } = Grid;
  const [tab, setTab] = useState("1")
  const screens = useBreakpoint();
  // const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  //   const goBack = () => navigate(-1)
  //   const goHome = () => navigate('/home')
  //   useEffect(() => {
  //     navigate('/new-page', {replace: true, state: {from: 'old-page'}})
  // }, [])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history?.location])
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
          marginTop: screens?.xs ? "32px" : "64px",
        }}
        width={screens?.xs ? 203 : 309}
        preview={false}
        src={LogoFullSVG}
        alt="Logo"
      />
      <Tabs
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