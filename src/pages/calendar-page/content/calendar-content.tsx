import { useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid, Calendar, CalendarProps, ConfigProvider, Badge, BadgeProps, Modal, Drawer, Image, Divider, Dropdown, Space, MenuProps, Input, Checkbox } from "antd"
import { Content } from "antd/lib/layout/layout"
import { IExercise, IExerciseWithId, ITraining, ITrainingReq } from "@redux/api/training/training.types"
import dayjs, { Dayjs } from "dayjs"
import { selectIsShowCalendarDate, selectTrainingList, selectTrainings } from "@redux/trainingSlice"
import { RefObject, useEffect, useRef, useState } from "react"
import useWindowWidth from "@hooks/use-window-width"
import noTrainingsPng from "@assets/imgs/noTrainings.png"
import { ArrowLeftOutlined, CloseOutlined, DownOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { ITrainingItem } from "@redux/api/catalog/catalog.types"
import { SelectionItem } from "antd/lib/table/interface"


export const CalendarContent = () => {

  type UserRefObject = {
    [key: string]: HTMLUListElement | null; // Замените HTMLDivElement на соответствующий тип элемента
  }
  const width = useWindowWidth()
  const ulRefs: RefObject<UserRefObject> = useRef<UserRefObject>({});
  const trainings = useAppSelector(selectTrainings)
  const trainingList = useAppSelector(selectTrainingList)
  const [isOpenFirstModal, setIsOpenFirstModal] = useState<boolean>(false)
  const [tabFirstModal, setTabFirstModal] = useState<number>(1)
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(true)
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedTypeOfTraining, setSelectedTypeOfTraining] = useState();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [trainingsSelected, setTrainingsSelected] = useState<ITraining[]>([]);
  const [newAddedTrainings, setNewAddedTrainings] = useState<ITrainingReq[]>([]);
  const [exerciseSelected, setExerciseSelected] = useState<IExerciseWithId[]>([]);
  const [newAddedExercise, setNewAddedExercise] = useState<IExercise[]>([]);
  // const isShowCalendarDate = useAppSelector(selectIsShowCalendarDate)
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const defaultExercise = {
    "name": "",
    "replays": 1,
    "weight": 0,
    "approaches": 1,
    "isImplementation": false
  }

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    // console.log(value.format('YYYY-MM-DD'), mode);
  };

  const changeTab = (value: number) => {
    setTabFirstModal(value)

  }

  const clearState = () => {
    setIsOpenFirstModal(false);
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    setTrainingsSelected([])
    setExerciseSelected([])
    setNewAddedTrainings([])
    setNewAddedExercise([])
  }

  const getListData = (value: Dayjs) => {
    const training = trainings?.filter(item =>
      dayjs(item.date).isSame(dayjs(value), "day")
    )
    // return training.length ? training : [{ name: "Силовая" }];
    // return training.length ? training : [{ name: "Силовая" }, { name: "Силовая" }, { name: "Силовая" }, { name: "Силовая" }, { name: "Силовая" }, { name: "Силовая" },];
    return training;
  };

  const handleSelectDate = (value: Dayjs) => {
    const ulElement = ulRefs?.current?.[dayjs(value).format()] || null;
    if (ulElement) {
      const ulPosition = ulElement.getBoundingClientRect();
      if (ulPosition.left + 264 > width) ulPosition.left - 264 + ulPosition.width
      setModalPosition({
        top: ulPosition.top - 28,
        left: (ulPosition.left + 264 > width) ? (ulPosition.left - 264 + ulPosition.width + 8) : (ulPosition.left - 8)
      });
      setIsOpenFirstModal(true);
    }
    console.log(getListData(value))
    setTrainingsSelected(getListData(value))
    setSelectedDate(value);

  };

  useEffect(() => {
    console.log(selectedTypeOfTraining)
  }, [selectedTypeOfTraining])

  // export interface ITraining {
  //   "_id": string,
  //   "name": string,
  //   "date": string,
  //   "isImplementation": false,
  //   "userId": "string",
  //   "parameters": IParameters,
  //   "exercises": IExerciseWithId[]
  // }

  const transformDropdownProps = () => {
    console.log(trainingList)
    return trainingList.map(item => {
      const newItem = { ...item }
      // newItem.label = <>{item.name}</>;
      newItem.label = item.name;
      return newItem
    })

    // const items: MenuProps['items'] = [
    //   {
    //     label: <a href="https://www.antgroup.com">1st menu item</a>,
    //     key: '0',
    //   },
    //   {
    //     label: <a href="https://www.aliyun.com">2nd menu item</a>,
    //     key: '1',
    //   },
    //   {
    //     type: 'divider',
    //   },
    //   {
    //     label: '3rd menu item',
    //     key: '3',
    //   },
    // ];
    // return items
  }


  enum colors {
    Ноги = "#FF4D4F",
    Силовая = "#FADB14",
    Руки = "#13C2C2",
    Грудь = "#52C41A",
    Спина = "#FA8C16",
    Кардио = "#EB2F96",
  }

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul style={{
        height: "100%", width: "100%"
      }}
        ref={(ref) => (ulRefs.current !== null ? ulRefs.current[dayjs(value).format()] = ref : '')}
        className="events">
        {listData.map((item, index) => (
          <li key={item._id}>
            <Badge color={colors?.[item.name as keyof typeof colors] || "#EB2F96"}
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
        onSelect={(value) => handleSelectDate(value as Dayjs)}
        dateCellRender={dateCellRender}
        onPanelChange={(value, mode) => onPanelChange(value as Dayjs, mode)}
      />
      <Modal
        closable={tabFirstModal == 1}
        width={264}
        mask={false}
        footer={null}
        bodyStyle={{ padding: "16px 0 12px" }}
        style={{ margin: 0, top: modalPosition.top, left: modalPosition.left }}
        open={isOpenFirstModal}
        onCancel={() => { setIsOpenFirstModal(false) }}
      >
        {tabFirstModal == 1 ?
          <div style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            // display: "flex",
            width: "100%",
            gap: "16px"
          }}>
            <div style={{
              paddingLeft: "12px",
              fontWeight: 700, fontSize: "14px", lineHeight: "18px"
            }}>
              Тренировки на {dayjs(selectedDate).format('l')}
            </div>
            {!trainingsSelected.length && <div
              style={{
                paddingLeft: "12px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                color: "#8C8C8C", fontSize: "14px", lineHeight: "18px"
              }}
            >Нет активных тренировок</div>}
            {!trainingsSelected.length ?
              <div style={{

                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "32px 0 16px 0"
              }}>
                <Image
                  // style={{ marginTop: "52px", transition: "width 0.5s ease-in-out, margin-top 0.5s ease-in-out" }}
                  width={32}
                  preview={false}
                  src={noTrainingsPng}
                  alt="no_Trainings"
                />
              </div> :
              <div style={{
                width: "100%",
                display: "flex",
                gap: "8px",
                flexDirection: "column",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "34px"
              }}>

                {trainingsSelected.map((item, index) => (
                  <li style={{
                    display: "flex", justifyContent: "space-between"
                  }} key={item.name}>
                    <Badge color={colors?.[item.name as keyof typeof colors] || "#EB2F96"}

                      // status={item.type as BadgeProps['status']}
                      text={item.name} />
                    <EditOutlined style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#2F54EB"
                    }} />G
                  </li>
                ))}
              </div>
            }
            <Divider style={{ margin: 0 }} />
            <div
              style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingTop: "12px"
              }}>
              <Button
                disabled={trainingList.length <= trainingsSelected.length}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  height: "40px",
                  lineHeight: "18px"
                }}
                onClick={() => changeTab(2)}
                type="primary" key="console">
                {trainingsSelected.length ? "Добавить тренировку" : "Создать тренировку"}
              </Button>
            </div>

          </div>
          :
          <div style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            // display: "flex",
            width: "100%",
            gap: "16px"
          }}>
            <div style={{
              paddingTop: "2px",
              paddingLeft: "12px",
              paddingRight: "12px",
              display: "flex", gap: "12px", fontSize: "14px", lineHeight: "18px"
            }}>
              <ArrowLeftOutlined onClick={() => { changeTab(1) }} />
              <Dropdown
                menu={{
                  items: transformDropdownProps(),
                  selectable: true,
                  onSelect: (item) => setSelectedTypeOfTraining(item)
                }} trigger={['click']}>
                <span style={{ width: "100%" }} onClick={e => e.preventDefault()}>
                  <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    {selectedTypeOfTraining ? selectedTypeOfTraining.item.props.name : "Выбор типа тренировки"}
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </div>
            <Divider style={{ margin: "17.5px 0 0" }} />
            {!trainingsSelected.length ?
              <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "32px 0 16px 0"
              }}>
                <Image
                  // style={{ marginTop: "52px", transition: "width 0.5s ease-in-out, margin-top 0.5s ease-in-out" }}
                  width={32}
                  preview={false}
                  src={noTrainingsPng}
                  alt="no_Trainings"
                />
              </div> :
              <div style={{
                width: "100%", display:
                  "flex", gap: "8px", flexDirection: "column",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "34px"
              }}>

                {trainingsSelected.map((item, index) => (
                  <li style={{
                    display: "flex", justifyContent: "space-between"
                  }} key={item.name}>
                    {/* <Badge color={colors?.[item.name as keyof typeof colors] || "#EB2F96"}

                      // status={item.type as BadgeProps['status']}
                      text={item.name} />
                    <EditOutlined style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#2F54EB"
                    }} /> */}
                    123
                  </li>
                ))}
              </div>
            }
            <Divider style={{ margin: 0 }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "100%",
                justifyContent: "center",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "12px"
              }}>
              <Button
                type="default"
                // disabled={trainingList.length <= trainingsSelected.length}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  height: "32px",
                  lineHeight: "18px"
                }}
                // onClick={() => {}} 
                key="console">
                Добавить упражнение
              </Button>
              <Button
                type="link"
                // disabled={trainingList.length <= trainingsSelected.length}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  height: "32px",
                  lineHeight: "18px"
                }}
                // onClick={() => {}} 
                key="console">
                Сохранить
              </Button>
            </div>
          </div>
        }

      </Modal>
      <Drawer
        mask={false}
        style={{
          zIndex: 1001
          // display: (screens?.xs) ? "block" : "none", <CloseOutlined />
        }}
        placement={"right"}
        closable={false}
        onClose={() => setIsShowAddingExersice(false)}
        open={isShowAddingExersice}
        key={"right"}
        width={408}
        bodyStyle={{
          padding: screens.xs ? "24px 16px 0" : "24px 32px 0",
        }}
      >
        <div style={{
          display: "flex", justifyContent: "space-between", paddingBottom: "16px"
        }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "26px",
            }}
          >Просмотр упражнений</div>
          <CloseOutlined style={{ cursor: "pointer" }} />

        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", paddingBottom: "16px", color: "#8C8C8C",
          fontSize: "14px", lineHeight: "18.2px"
        }}>
          <div>
            {selectedTypeOfTraining?.item?.props?.name && <Badge color={colors?.[selectedTypeOfTraining?.item?.props?.name as keyof typeof colors] || "#EB2F96"}
              text={selectedTypeOfTraining?.item?.props?.name} />}
          </div>
          <div>{dayjs().format("l")}</div>

        </div>
        <div style={{
          padding: screens.xs ? "0 0 24px " : "0 0 24px"
        }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "24px",
              gap: "8px"
            }}
          >
            <div><Input size="small" style={{ height: "24px" }}
              addonAfter={<Checkbox style={{ marginTop: "-5px" }}></Checkbox>}
              placeholder="Упражнение"></Input></div>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "24px",
                    paddingLeft: "8px",
                    backgroundColor: "#F0F0F0",
                  }}
                >
                  Подходы
                </div>
                <Input
                  size="small"
                  type="number" style={{
                    padding: 0,
                    height: "24px !important",
                    width: "120px",
                  }} placeholder="1"

                  addonBefore={<PlusOutlined style={{ lineHeight: "24px", fontSize: "10px" }} />}
                ></Input>
              </div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <div
                    style={{
                      width: "89px",
                      height: "24px",
                      paddingLeft: "8px",
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    Вес, кг
                  </div>

                  <Input type="number" style={{
                    height: "24px",
                    width: "89px",
                  }} placeholder="0"></Input>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <div
                    style={{
                      height: "24px",
                    }}
                  >
                  </div>
                  <div
                    style={{
                      height: "24px",
                      padding: "0 2px",
                      color: "#BFBFBF"
                    }}
                  >x</div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                >
                  <div
                    style={{
                      width: "89px",
                      height: "24px",
                      paddingLeft: "8px",
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    Количество
                  </div>
                  <Input type="number" style={{
                    height: "24px",
                    width: "89px",
                  }} placeholder="1"></Input>
                </div>
              </div>
            </div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            height: "40px",
            width: "100%",
            backgroundColor: "#F0F0F0",
            borderRadius: "0 0 6px 6px"
          }}>
            <Button
              type="link"
              // disabled={trainingList.length <= trainingsSelected.length}
              style={{
                color: "#2F54EB",
                height: "100%",
                width: "100%",
                fontSize: "14px",
                lineHeight: "18px"
              }}
              icon={<PlusOutlined />}
              // onClick={() => {}} 
              key="console">
              Добавить еще
            </Button>
            <Button
              type="link"
              icon={<MinusOutlined />}
              // disabled={trainingList.length <= trainingsSelected.length}
              style={{
                height: "100%",
                width: "100%",
                fontSize: "14px",
                lineHeight: "18px"
              }}
              // onClick={() => {}} 
              key="console">
              Удалить
            </Button>
          </div>
        </div>
        <div style={{
          textAlign: "center",
          color: "#8C8C8C",
          fontSize: "12px",
          lineHeight: "15.6px",
          paddingBottom: screens.xs ? "12px" : "32px"
        }}>
          После сохранения внесенных изменений <br />отредактировать проведенную тренировку <br /> будет невозможно
        </div>
      </Drawer>
    </Content >
  )
};
