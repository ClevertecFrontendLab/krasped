import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid, Calendar, CalendarProps, ConfigProvider } from "antd"
import { Content } from "antd/lib/layout/layout"
import { ITraining } from "@redux/api/training/training.types"
import dayjs, { Dayjs } from "dayjs"


export const CalendarContent = ({ data }: {

  data: ITraining[] | undefined,
  // openFeedback: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <Content style={{ backgroundColor: "rgb(240, 245, 255)", padding: "0 24px 93px", display: "flex", width: "100%", overflow: 'initial' }}>

      <Calendar style={{ padding: 0, backgroundColor: "rgb(240, 245, 255)" }} />
    </Content >
  )
}