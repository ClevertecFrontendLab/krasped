
import React from "react"
import Enter_page_light from "@assets/imgs/Enter_page_light.png"
import Lottie from "lottie-react"
import animationData from './loader.json'


export const SuspenceLoaderComponent: React.FC = () => {
  return (
    <>
      <div style={{
        width: "100%",
        height: "100dvh",
        zIndex: 998,
        // backgroundImage: `url(${Enter_page_light})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(121, 156, 212, 0.5)",
        backdropFilter: "blur(3px)"
      }}>
        <Lottie animationData={animationData} style={{ width: "150px" }} loop={true} />
      </div>
    </>
  )
}