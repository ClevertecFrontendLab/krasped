import { HeartOutlined, StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons"
import { IFeedback } from "@api/feedback/feedback.types"
import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid } from "antd"
import { Content } from "antd/lib/layout/layout"
import dayjs from "dayjs"
import { useMemo } from "react"



export const FeedbackContent = ({ data }: { data: IFeedback[] | undefined }) => {
  const isShowAllFeedbacks = useAppSelector(selectIsShowAllFeedbacks)
  const fourFeedbacks = useMemo(() => data?.slice(-4).reverse(), [data])
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Content style={{ display: "flex", height: "100%", width: "100%", overflow: 'initial' }}>
      {data?.length ? <div
        style={{
          position: "relative",
          padding: 24,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >{(isShowAllFeedbacks ? data : fourFeedbacks)?.map((item) => {

        return (
          <Card key={item.id} bodyStyle={{ padding: "16px" }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "174px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "12px",
                  marginRight: "12px"
                }}>
                <Avatar size="large" src={item.imageSrc} icon={<UserOutlined />} />
                <div style={{
                  wordSpacing: "174px",
                  fontSize: "16px",
                  lineHeight: "20.8px",
                  textAlign: "center"
                }}>{item?.fullName || "Пользователь"}</div>
              </div>

              <div
                style={{
                  width: "calc(100% - 186px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>

                <div
                  style={{
                    display: "flex",
                    gap: "16px"
                  }}
                >
                  <Rate
                    style={{ fontSize: 13, gap: "4px" }}
                    character={({ index }) => {
                      if (index !== undefined && index < item.rating) {
                        return <StarFilled />;
                      }
                      return <StarOutlined />;
                    }}
                    allowHalf disabled value={item.rating} />
                  <div style={{ fontSize: "12px", display: "flex", alignItems: "center", color: "#BFBFBF" }}>{dayjs(item.createdAt).format('DD.MM.YYYY')}</div>
                </div>
                <div style={{
                  fontSize: "14px",
                  lineHeight: "18.2px",
                  color: "#8C8C8C",
                  wordWrap: "break-word"
                }}>{item.message}</div>
              </div>
            </div>
          </Card>
        )
      })}


      </div>
        :
        <div style={{
          width: "100%",
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          padding: screens?.xs ? "24px 16px" : "24px",
          justifyContent: screens?.xs ? "" : "center",
          gap: screens?.xs ? "48px" : "20px"
        }}>
          <Card style={{ width: "100%", padding: screens?.xs ? "48px 23px" : "56px 56px 75px", }} bodyStyle={{ padding: 0 }}>
            <div style={{
              textAlign: "center",
              fontSize: "24px",
              lineHeight: "31px",
              fontWeight: 500,
              paddingBottom: "48px",
              color: "#061178"
            }}>
              Оставьте свой отзыв первым
            </div>
            <div style={{
              textAlign: "center",
              fontSize: "14px",
              lineHeight: "18px",
              color: "#8C8C8C",
            }}>
              Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.<br /> Поделитесь своим мнением и опытом с другими пользователями, <br />и помогите им сделать правильный выбор.
            </div>
          </Card>
          <Button type="primary" >
            Написать отзыв
          </Button>
        </div>
      }
    </Content >
  )
}