import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Grid } from "antd"
import React from "react";
export interface IItem {
  imageSrc: string;
  fullName: string;
}

function splitStringBySpace(inputString: string) {
  if (inputString.includes(' ')) {
    const array = inputString.split(' ')
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push(array[i]);
      if (i < array.length - 1) {
        newArray.push(" ");
      }
    }
    return newArray
  } else {
    return [inputString];
  }
}

const HighlightName = ({ fullName = "Пользователь", searchValue = "" }) => {
  if (searchValue && fullName.toLowerCase().includes(searchValue.toLowerCase())) {
    const index = fullName.toLowerCase().indexOf(searchValue.toLowerCase());
    const beforeMatch = splitStringBySpace(fullName.substring(0, index));
    const match = splitStringBySpace(fullName.substring(index, index + searchValue.length));
    const afterMatch = splitStringBySpace(fullName.substring(index + searchValue.length));
    return (
      <div>
        {beforeMatch.map((part) => (part == ' ' ? <br /> : <span>{part}</span>))}
        {match.map((part) => (part == ' ' ? <br /> : <span style={{ color: "red" }}>{part}</span>))}
        {afterMatch.map((part) => (part == ' ' ? <br /> : <span>{part}</span>))}
      </div>
    );

  } else {
    const parts = fullName.split(' ');
    return (
      <div>
        {parts.map((part, index) => (
          <div key={index}>
            {part}
          </div>
        ))}
      </div>
    );
  }
  // return (
  //   <div>

  //     {parts.map((part, index) => (
  //       <span key={index}>
  //         {part === '' ? <br /> : (
  //           <span style={part.toLowerCase() === searchValue.toLowerCase() ? { color: 'red' } : null}>
  //             {part}
  //           </span>
  //         )}
  //       </span>
  //     ))}
  //   </div>
  // );
};

export const TrainingCard = ({ item, searchValue }: { item: IItem, searchValue: string }) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Card
      bodyStyle={{ padding: "8px 15px" }}
      style={{
        height: "194px",
        display: 'flex',
        flexDirection: "column",
        // eslint-disable-next-line no-constant-condition
        backgroundColor: !true ? "#F0F5FF" : "#FAFAFA"
      }}>
      <div
        style={{
          width: "174px",
          display: "flex",
          alignItems: screens?.xs ? "start" : "center",
          gap: "8px",
          marginRight: "12px"
        }}>
        <Avatar size="large" src={item.imageSrc} icon={<UserOutlined />} />
        <HighlightName fullName={item.fullName} searchValue={searchValue} />
        {/* <div style={{
          wordSpacing: screens?.xs ? "" : "174px",
          fontSize: "16px",
          lineHeight: "20.8px",
          textAlign: "center"
        }}>{
            item?.fullName ?
              item.fullName.split(' ').map((item) => <>{item}<br /></>)
              :
              "Пользователь"
          }</div> */}
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        paddingBottom: "20px",
        paddingTop: "15px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span style={{
            color: '#8C8C8C',
            fontSize: "12px",
            lineHeight: "16px"
          }}>Тип тренировки:</span>
          <span
            style={{
              color: "#2F54EB",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "18px"
            }}
          >Силовая</span>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span style={{
            color: '#8C8C8C',
            fontSize: "12px",
            lineHeight: "16px"
          }}>Средняя нагрузка:</span>
          <span
            style={{
              color: "#2F54EB",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "18px"
            }}
          >154 кг/нед</span>
        </div>
      </div>
      <div style={{
        paddingBottom: "12px",
      }}>
        <Button style={{
          color: "#262626",
          display: "flex",
          alignItems: "center",
          height: "28px",
          textAlign: "center",

        }}>
          Отменить тренировку
        </Button>
        <Button
          disabled
          type="primary"
          style={{
            textAlign: "center",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "28px",
          }}>
          Создать тренировку
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <span style={{
          fontSize: "12px",
          color: "#262626",
        }}>тренировка одобрена</span>
        <CheckCircleFilled style={{
          color: "#52C41A",
          fontSize: "14px"
        }} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <span style={{
          fontSize: "12px",
          color: "#262626",
        }}>тренировка отклонена</span>
        <ExclamationCircleOutlined style={{
          color: "#8C8C8C",
          fontSize: "16px",
        }} />
      </div>
    </Card>
  )
}