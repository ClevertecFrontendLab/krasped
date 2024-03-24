import { Button, Grid, Result } from "antd"
import { Content } from "antd/lib/layout/layout"

import { _AuthLogin } from "@config/constants"



export const CalendarContent = () => {


  const { useBreakpoint } = Grid;
  const screen = useBreakpoint();

  return (
    <Content style={{ boxSizing: "border-box", borderRadius: "8px", backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", height: "100%", overflow: 'initial' }}>
      <Result
        status="404"
        title="Такой страницы нет"
        subTitle="Извините, страница не найдена, возможно, она была удалена или перемещена."
        extra={<Button type="primary">На главную</Button>}
      />
    </Content >
  )
};
