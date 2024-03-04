
import React from "react"
import { useSelector } from "react-redux"
import Lottie from 'lottie-react';
import animationData from './loader.json'

export const LoaderComponent = () => {
  const options = {
    animationData: animationData,
    loop: true,
    width: "150px",
    height: "150px",
  };
  const isSomeQueryPending = useSelector(state => { return (
    Object.values(state?.auth?.queries).some(query => query?.status === 'pending') ||
    Object.values(state?.feedback?.queries).some(query => query?.status === 'pending')
  ) })
  const isSomeMutationPending = useSelector(state => { return (
    Object.values(state?.auth?.mutations).some(mutation => mutation?.status === 'pending') ||
    Object.values(state?.feedback?.mutations).some(mutation => mutation?.status === 'pending')
  ) })
  return (
    <>
      {(isSomeQueryPending||isSomeMutationPending) &&
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(121, 156, 212, 0.5)",
          backdropFilter: "blur(3px)"
        }}>
          <Lottie data-test-id='loader' animationData={animationData} style={{width:"150px"}} loop={true} />
        </div>
      }
    </>
  )
}