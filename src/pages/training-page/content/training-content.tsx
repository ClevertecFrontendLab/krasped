import { Content } from "antd/lib/layout/layout"
import { _409, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Grid } from "antd"


export const TrainingContent = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  
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
     123
    </Content >
  )
}