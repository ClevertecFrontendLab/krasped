import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid, Calendar, CalendarProps, ConfigProvider, Badge, BadgeProps, Modal } from "antd"
import { Content } from "antd/lib/layout/layout"
import { ITraining } from "@redux/api/training/training.types"
import dayjs, { Dayjs } from "dayjs"
import { selectIsShowCalendarDate, selectTrainings } from "@redux/trainingSlice"
import { useRef, useState } from "react"
import useWindowWidth from "@hooks/use-window-width"


export const CalendarContent = () => {
  const width = useWindowWidth()
  const ulRefs = useRef({});
  const trainings = useAppSelector(selectTrainings)
  const [isOpenFirstModal, setIsOpenFirstModal] = useState<boolean>(true)
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const isShowCalendarDate = useAppSelector(selectIsShowCalendarDate)
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onPanelChange = (value, mode: CalendarProps<Dayjs>['mode']) => {
    // console.log(value.format('YYYY-MM-DD'), mode);
  };


  const handleSelectDate = (value) => {
    const ulElement = ulRefs.current[dayjs(value)];
    if (ulElement) {
      const ulPosition = ulElement.getBoundingClientRect();
      console.log(ulPosition)
      // console.log(`Position of <ul> element with id ${dayjs(value)}:`);
      console.log("Top:", ulPosition.top);
      console.log("Left:", ulPosition.left);
      if (ulPosition.left + 264 > width) ulPosition.left - 264 + ulPosition.width
      setModalPosition({
        top: ulPosition.top - 28,
        left: (ulPosition.left + 264 > width) ? (ulPosition.left - 264 + ulPosition.width + 8) : (ulPosition.left - 8)
      });
      setIsOpenFirstModal(true);

    }
    setSelectedDate(value);
    // setModalPosition({ top: e.clientY, left: e.clientX });
    // setIsOpenFirstModal(true);
  };

  const getListData = (value: any) => {
    const training = trainings.filter(item => {
      dayjs(item.date).isSame(dayjs(value), "day")
    })

    return training || [];
  };

  const colors = [
    "#13C2C2",
    "#FF4D4F",
    "#FADB14",
    "#52C41A",
    "#52C41A"]

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul style={{
        height: "100%", width: "100%"
      }}
        ref={(ref) => (ulRefs.current[dayjs(value)] = ref)}
        className="events">
        {listData.map((item, index) => (
          <li key={item._id}>
            <Badge color={colors[index] || "52C41A"}
              // status={item.type as BadgeProps['status']}
              text={item.name} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Content style={{ backgroundColor: "rgb(240, 245, 255)", padding: "0 24px 93px", display: "flex", width: "100%", overflow: 'initial' }}>

      <Calendar style={{ padding: 0, backgroundColor: "rgb(240, 245, 255)" }}
        onSelect={handleSelectDate}
        dateCellRender={dateCellRender}
        onPanelChange={onPanelChange}
      />
      <Modal
        width={264}
        mask={false}
        footer={null}
        bodyStyle={{ padding: "16px 24px" }}
        style={{ margin: 0, top: modalPosition.top, left: modalPosition.left }}
        open={isOpenFirstModal}
        onCancel={() => setIsOpenFirstModal(false)}>
        <div style={{ alignItems: "flex-start", display: "flex", width: "264px", gap: "16px" }}>

          <Button
            style={{
              fontSize: "14px",
              height: "28px",
              lineHeight: "18px"
            }}
            onClick={() => {}} type="primary" key="console">
            Обновить
          </Button>

        </div>

      </Modal>
    </Content >
  )
};
