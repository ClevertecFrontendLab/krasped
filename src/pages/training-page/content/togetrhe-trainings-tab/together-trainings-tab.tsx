import { Content } from "antd/lib/layout/layout"
import { _409, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Avatar, Card, Drawer, Grid, Input, Pagination, Tabs } from "antd"
import { useState } from "react";
import { IItem, TrainingCard } from "./training-card/training-card";
import { DrowerContent } from "./drower-content";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { selectUsersJoing } from "@redux/trainingSlice";
import { useGetTrainingPalsQuery } from "@redux/api/catalog/catalog";
import { IInvite } from "@redux/api/training/training.types";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

// const filtredItems: IItem[] = [
//   {
//     name: "Artem kradsfwtsow",
//     imageSrc: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
//   },
// ]

const invites: IInvite[] = [

]


export const TogetherTrainingsTab = () => {
  useGetTrainingPalsQuery(null);
  const { Search } = Input;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const usersJoing = useAppSelector(selectUsersJoing);
  const [searchValue, setSearchValue] = useState('');
  const [subTab, setSubTab] = useState('1');
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<IItem>()
  const [page, setPage] = useState<number>(1)
  const indexOfLastContent = page * (screens.xs ? 8 : 12);
  const indexOfFirstContent = indexOfLastContent - (screens.xs ? 8 : 12);
  const currentContents = usersJoing.slice(indexOfFirstContent, indexOfLastContent);


  const handleChangePage = (page: number) => {
    setPage(page)
  }

  const onCloseExercise = () => {
    // setNewAddedExercise(v => v.filter(item => item.name))
    setIsShowAddingExersice(false)
  }

  const onCancelTraining = (item: IItem) => {

  }
  const onCreateTraining = (item: IItem) => {
    setSelectedUser(item)
    setIsShowAddingExersice(true)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Content style={{
      boxSizing: "border-box",
      borderRadius: screens.xs ? 0 : "8px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: 'initial',
      position: "relative",
    }}>
      {selectedUser && <Drawer
        data-test-id='modal-drawer-right'
        style={{
          zIndex: 1001
        }}
        maskStyle={{ background: "none" }}
        placement={"right"}
        closable={false}
        onClose={() => onCloseExercise()}
        open={isShowAddingExersice}
        key={"right"}
        width={screens.xs ? "100%" : 408}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          padding: screens.xs ? "24px 16px 0" : "24px 32px 0",
        }}
      >
        <DrowerContent selectedUser={selectedUser} isShowAddingExersice={isShowAddingExersice} onCloseExercise={() => onCloseExercise()} />
      </Drawer>}
      {(subTab == "2")
        ?
        <div style={{
          width: "100%",
          height: "100%",
        }}>
          <div>
            <Search placeholder="Поиск по имени" onSearch={handleSearch} style={{ width: 200 }} />
            {/* <Input placeholder="Поиск по имени" value={searchValue} onChange={handleSearch} /> */}
          </div>
          <div style={{
            width: "100%",
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            gap: "16px",
          }}>
            {currentContents.map(item => {
              return (
                <TrainingCard onCancelTraining={onCancelTraining} onCreateTraining={onCreateTraining} item={item} searchValue={searchValue} />
              )
            })}
          </div>
          <div>{((screens.xs && usersJoing.length > 8) || (usersJoing.length > 12)) && <Pagination
            onChange={handleChangePage}
            current={page}
            total={usersJoing.length}
            pageSize={screens.xs ? 8 : 12}
            size="small" />}</div>
        </div>
        :
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            gap: "24px",
          }}
        >
          {invites.length && <div
            style={{
              backgroundColor: '#FAFAFA',
              width: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "16px 24px 24px"
            }}
          >
            <div>Новое сообщение {`(${invites.length})`}</div>
            {invites.map(item => (
              <Card key={item._id} bodyStyle={{ padding: "16px" }}>
              <div style={{ display: "flex", flexDirection: screens?.xs ? "column" : "row" }}>
                <div
                  style={{
                    width: "174px",
                    display: "flex",
                    alignItems: screens?.xs ? "start" : "center",
                    flexDirection: screens?.xs ? "row" : "column",
                    gap: "12px",
                    marginRight: "12px"
                  }}>
                  <Avatar size="large" src={item?.from?.imageSrc} icon={<UserOutlined />} />
                  <div style={{
                    wordSpacing: screens?.xs ? "" : "174px",
                    fontSize: "16px",
                    lineHeight: "20.8px",
                    textAlign: "center"
                  }}>{
                      item?.from?.firstName ?
                        <>
                          {item?.from?.firstName}
                          <br />
                          {item?.from?.lastName}
                        </>
                       
                        :
                        "Пользователь"
                    }</div>
                </div>
  
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
  
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      gap: "16px"
                    }}
                  >
                    
                    <div style={{ fontSize: "12px", display: "flex", alignItems: "center", color: "#BFBFBF" }}>{dayjs(item.createdAt).format('DD.MM.YYYY')}</div>
                  </div>
                  <div style={{
                    fontSize: "14px",
                    lineHeight: "18.2px",
                    color: "#8C8C8C",
                    wordWrap: "break-word"
                  }}>{123}</div>
                </div>
                <div>
                  buttons
                </div>
              </div>
            </Card>
            ))}
          </div>}
          <div>хочешь тренироваться</div>
          <div>Мои партнепры по тренировкам</div>
        </div>
      }
    </Content >
  )
}