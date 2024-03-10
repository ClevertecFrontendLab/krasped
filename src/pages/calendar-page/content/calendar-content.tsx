import { HeartOutlined, StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons"
import { IFeedback } from "@redux/api/feedback/feedback.types"
import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid } from "antd"
import { Content } from "antd/lib/layout/layout"
import dayjs from "dayjs"
import { useMemo } from "react"
import { ITraining } from "@redux/api/training/training.types"



export const CalendarContent = ({ data }: {
  data: ITraining[] | undefined,
  // openFeedback: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Content style={{ display: "flex", height: "100%", width: "100%", overflow: 'initial' }}>
      123
    </Content >
  )
}