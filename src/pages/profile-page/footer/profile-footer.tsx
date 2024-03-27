import { AndroidFilled, AppleFilled } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { selectIsShowAllFeedbacks, toggleIsShowAllFeedbacks } from "@redux/feedbackSlice";
import { Button, Card, Grid } from "antd"
import { Footer } from "antd/lib/layout/layout"
import React from "react";

export const FeedbackFooter = (props: { openFeedback: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useAppDispatch()
  const isShowAllFeedbacks = useAppSelector(selectIsShowAllFeedbacks)
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Footer style={{
      height: "100%",
      padding: 0,
      background: "none", display: "flex",
      flexWrap: "wrap",
      gap: screens?.xs ? "20px" : "8px",
      alignItems: "flex-end",
      justifyContent: screens?.xs ? "center" : ""
    }}>

      <Button onClick={() => props.openFeedback(true)} type="primary" >
        Написать отзыв
      </Button>
      <Button type='link' onClick={() => dispatch(toggleIsShowAllFeedbacks())}>
        {isShowAllFeedbacks ? "Свернуть все отзывы" : "Развернуть все отзывы"}
      </Button>

    </Footer>
  )
}