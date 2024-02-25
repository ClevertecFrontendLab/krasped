import { Layout } from "antd"
import Enter_page_light from "@assets/imgs/Enter_page_light.png"
import { Outlet } from "react-router-dom"
import React, { PropsWithChildren } from "react"
import { LoaderComponent } from "@components/loader/api-loader.jsx"


export const AuthLayout: React.FC = (props: PropsWithChildren) => {
  return (
    <>
      <Layout style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        zIndex: 0
      }}>
        <LoaderComponent />
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          zIndex: "0",
          backgroundImage: `url(${Enter_page_light})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px)"
        }}></div>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          top: 0,
          zIndex: "0",
          backgroundColor: "rgba(121, 156, 212, 0.5)",
        }}>
        </div>
        {props.children}
        {<React.Suspense fallback={<LoaderComponent />}>
          <Outlet />
        </React.Suspense>}
      </Layout>
    </>
  )
}