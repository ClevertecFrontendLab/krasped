
import React from "react"
import Lottie from "lottie-react"
import animationData from './loader.json'

export const SuspenceLoaderComponent: React.FC = () => {
  return (
    <>
      <div style={{
        width: "100%",
        height: "100dvh",
        zIndex: 998,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(121, 156, 212, 0.5)",
        backdropFilter: "blur(3px)"
      }}>
        <Lottie data-test-id='loader' animationData={animationData} style={{ width: "150px" }} loop={true} />
      </div>
    </>
  )
}