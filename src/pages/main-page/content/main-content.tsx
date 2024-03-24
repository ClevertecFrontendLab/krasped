import { HeartFilled, CalendarTwoTone, IdcardTwoTone } from "@ant-design/icons"
import { _Profile } from "@config/constants"
import { history } from "@redux/configure-store"
import { Card, Button } from "antd"
import { Content } from "antd/lib/layout/layout"

export const MainContent = (props: { getCalendar: () => void }) => {
  return (
    <Content style={{ overflow: 'initial' }}>
      <div
        style={{
          position: "relative",
          maxWidth: "800px",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        <Card style={{
          color: "#061178",
          fontSize: "16px",
          lineHeight: "20.8px"
        }}>
          C CleverFit ты сможешь:<br />
          — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br />
          — отслеживать свои достижения в разделе статистики, сравнивая свои результаты c нормами и рекордами;<br />
          — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы o тренировках;<br />
          — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
        </Card>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <Card style={{
            fontSize: "20px",
            lineHeight: "26px",
            fontWeight: 500,
          }}>
            <p>{"CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!"}</p>
          </Card>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px"
            }}
          >
            <Card
              style={{
                flex: 1
              }}
              size='small'
              title="Расписать тренировки"
              headStyle={{ wordWrap: "break-word", display: "flex", alignItems: "center", justifyContent: "center", height: "45px" }}
              bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
              bordered={false} >
              <Button type='link'>
                <HeartFilled />
                Тренировки
              </Button>
            </Card>
            <Card
              style={{
                flex: 1
              }}
              size='small'
              title="Назначить календарь"
              headStyle={{ wordWrap: "break-word", display: "flex", alignItems: "center", justifyContent: "center", height: "45px" }}
              bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
              bordered={false} >
              <Button data-test-id='menu-button-calendar' type='link' onClick={() => props.getCalendar()}>
                <CalendarTwoTone />
                Календарь
              </Button>
            </Card>
            <Card
              style={{
                flex: 1
              }}
              size='small'
              title="Заполнить Профиль"
              headStyle={{ wordWrap: "break-word", display: "flex", alignItems: "center", justifyContent: "center", height: "45px" }}
              bodyStyle={{ textAlign: "center", height: "56px", padding: "12px" }}
              bordered={false} >
              <Button type='link' onClick={() => history.push(_Profile)}>
                <IdcardTwoTone />
                Профиль
              </Button>
            </Card>
          </div>
        </div>

      </div>
    </Content >
  )
}