import { Content } from "antd/lib/layout/layout"
import { _409, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Grid, Tabs } from "antd"
import { useState } from "react";
import { IItem, TrainingCard } from "./training-card/training-card";


export const TogetherTrainingsTab = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [tab, setTab] = useState("1")

  const item: IItem = {
    fullName: "Artem krawtsow",
    imageSrc: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
  }

  return (
    <Content style={{
      padding: "24px",
      boxSizing: "border-box",
      borderRadius: screens.xs ? 0 : "8px",
      backgroundColor: "white",
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      height: "100%",
      overflow: 'initial',
      position: "relative",
    }}>
      <div></div>
      <div style={{
        width: "100%"
      }}></div>
      <div></div>
      <TrainingCard item={item} />
      <TrainingCard item={item} />
      <TrainingCard item={item} />
      <TrainingCard item={item} />
      <TrainingCard item={item} />
      <TrainingCard item={item} />
      <TrainingCard item={item} />
      <TrainingCard item={item} />
    </Content >
  )
}