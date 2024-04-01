import { Content } from "antd/lib/layout/layout"
import { _409, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Grid, Tabs } from "antd"
import { useState } from "react";


export const TogetherTrainingsTab = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [tab, setTab] = useState("1")
  
  return (
    <Content style={{
      padding: "24px",
      boxSizing: "border-box",
      borderRadius: screens.xs ? 0 : "8px",
      backgroundColor: "white",
      display: "flex",
      height: "100%",
      overflow: 'initial',
      position: "relative",
    }}>
     2
    </Content >
  )
}