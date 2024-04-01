import { Content } from "antd/lib/layout/layout"
import { _409, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Grid, Tabs } from "antd"
import { useState } from "react";
import { MyTrainingsTab } from "./my-trainings-tab/my-trainings-tab";
import { TogetherTrainingsTab } from "./togetrhe-trainings-tab/together-trainings-tab";


export const TrainingContent = ({isHideAddTrainingBtn}: {isHideAddTrainingBtn: boolean}) => {
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
     <Tabs
        style={{ width: "100%" }}
        tabBarGutter={0}
        activeKey={tab}
        onChange={(val) => setTab(val)}
        items={[
          {
            label: "Мои тренировки",
            key: '1',
            children: <MyTrainingsTab isHideAddTrainingBtn={isHideAddTrainingBtn} />,
          },
          {
            label: "Совместные тренировки",
            key: '2',
            children: <TogetherTrainingsTab />,
          },
          {
            label: "Марафоны",
            key: '3',
            children: <></>,
          },
        ]}
      />
    </Content >
  )
}