import { LoginForm } from "@components/login-form/login-form"
import { Card, Grid, Image } from "antd"
import LogoFullSVG from "@assets/icons/logo-full.svg"
import { AuthLayout } from "@components/layouts/auth-layout/auth-layout"

export const AuthPage: React.FC = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <AuthLayout>
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: screens?.xs ? "32px" : "48px",
          width: screens?.xs ? 328 : 539,
          padding: screens?.xs ? "32px 16px 124px" : "64px 85.5px 174px"
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
        <div>
          <LoginForm />
          <div>register</div>
        </div>
      </Card>
    </AuthLayout>
  )
}