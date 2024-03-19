import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid, Calendar, CalendarProps, ConfigProvider, Badge, BadgeProps, Modal, Drawer, Image, Divider, Dropdown, Space, MenuProps, Input, Checkbox } from "antd"
import { Content } from "antd/lib/layout/layout"
import { IExercise, IExerciseWithId, ITraining, ITrainingReq } from "@redux/api/training/training.types"
import dayjs, { Dayjs } from "dayjs"
import { selectIsShowCalendarDate, selectTrainingList, selectTrainings } from "@redux/trainingSlice"
import { RefObject, useEffect, useRef, useState } from "react"
import useWindowWidth from "@hooks/use-window-width"
import noTrainingsPng from "@assets/imgs/noTrainings.png"
import { ArrowLeftOutlined, CloseCircleOutlined, CloseOutlined, DownOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { ITrainingItem } from "@redux/api/catalog/catalog.types"
import { SelectionItem } from "antd/lib/table/interface"
import { ExserciseItem } from "./exsercise-item-form"
import { useAddTrainingMutation, useUpdateTrainingMutation } from "@redux/api/training/training"
import { history } from "@redux/configure-store"
import { logout } from "@redux/userSlice"


export const CalendarContent = () => {
  const dispatch = useAppDispatch()
  const [AddTraining, { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError, error: addError }] = useAddTrainingMutation();
  const [UpdateTraining, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateTrainingMutation();
  type UserRefObject = {
    [key: string]: HTMLUListElement | null; // Замените HTMLDivElement на соответствующий тип элемента
  }
  const width = useWindowWidth()
  const ulRefs: RefObject<UserRefObject> = useRef<UserRefObject>({});
  const trainings = useAppSelector(selectTrainings)
  const trainingList = useAppSelector(selectTrainingList)
  const [isAddTrainingError, setIsAddTrainingError] = useState<boolean>(false)
  const [isOpenFirstModal, setIsOpenFirstModal] = useState<boolean>(false)
  const [tabFirstModal, setTabFirstModal] = useState<number>(1)
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedTypeOfTraining, setSelectedTypeOfTraining] = useState<string>();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [trainingsSelected, setTrainingsSelected] = useState<ITraining[]>([]);
  // const [newAddedTrainings, setNewAddedTrainings] = useState<ITrainingReq[]>([]);
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
    "isImplementation": false,
    "isSelectedForDelete": false
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
    // setNewAddedTrainings([])
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
    clearState()
    if (dayjs().isBefore(dayjs(value), "day")) {
      setTabFirstModal(1)
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
      setTrainingsSelected(getListData(value))
      setSelectedDate(value);
    } else {
      return
    }

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
    const uniqueTrainingNames = new Set(trainingsSelected.map(item => item.name));
    return trainingList
      .filter(item => !uniqueTrainingNames.has(item.name))
      .map(item => {
        return { ...item, label: item.name };
      });
  }

  const changeItemObj = (newEx: IExercise) => {
    console.log(newEx)
    console.log(newAddedExercise)
    let isChanged = false
    setNewAddedExercise(v => {
      const newExe = v.map(item => {
        console.log(item?.unicKyeForDev === newEx?.unicKyeForDev, item?.name == newEx?.name)
        if (item?.unicKyeForDev === newEx?.unicKyeForDev) { isChanged = true; return newEx }
        console.log("item")
        if (isChanged) return item
        console.log("newEx")
        if (!item?.unicKyeForDev && !newEx?.unicKyeForDev && (item?.name == newEx?.name)) return newEx
        console.log("item")
        return item
      })
      console.log(newExe)
      return newExe
    }
    )
  }

  const removeSelectedExersices = () => {
    setNewAddedExercise(v => {
      return v.filter(item => !item?.isSelectedForDelete)
    })
  }

  const onCloseExercise = () => {
    setNewAddedExercise(v => v.filter(item => item.name))
    setIsShowAddingExersice(false)
  }

  const editTraining = (training: ITraining) => {
    setTabFirstModal(2)
    setSelectedTypeOfTraining(training.name);
    setExerciseSelected(training.exercises)
    // setNewAddedTrainings([])
    setNewAddedExercise(training.exercises)
  }

  const onChangeDropdown = (name: string | undefined) => {
    setSelectedTypeOfTraining(name)
    //если будующее
    setExerciseSelected([])
    setNewAddedExercise([])
    //если прошлое
  }

  const isOldTraining = () => {
    return trainingsSelected.find(item => item.name == selectedTypeOfTraining)
  }

  const saveCurrentTraining = () => {
    if (!selectedTypeOfTraining) return
    const old = trainingsSelected.find(item => item.name == selectedTypeOfTraining)
    const training: ITrainingReq = {
      ...old,
      name: selectedTypeOfTraining,
      date: dayjs(selectedDate).add(dayjs().utcOffset() / 60, 'hour').toISOString(),
      exercises: newAddedExercise
    }
    clearState()
    setIsOpenFirstModal(true)
    setTabFirstModal(1)
    if (old) {
      const { _id, ...rest } = training as ITraining
      UpdateTraining({ rest, _id })
    } else {
      AddTraining(training)
    }
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

  useEffect(() => {

    if (isAddSuccess && selectedDate) { setTrainingsSelected(getListData(selectedDate)) }
    if (isAddError) {
      const customError = addError as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push("/auth/login")
      }
      setSelectedDate(undefined)
      setIsAddTrainingError(true)
      // closeFeedbackFrom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddLoading]);

  useEffect(() => {

    if (isUpdateSuccess && selectedDate) { setTrainingsSelected(getListData(selectedDate)) }
    if (isUpdateError) {
      const customError = updateError as { status: number }
      if (customError.status == 403) {
        dispatch(logout())
        history.push("/auth/login")
      }
      setSelectedDate(undefined)
      setIsAddTrainingError(true)
      // closeFeedbackFrom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateLoading]);

  useEffect(() => {
    if (selectedDate && isOpenFirstModal)
      setTrainingsSelected(getListData(selectedDate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainings]);

  return (
    <Content style={{ backgroundColor: "rgb(240, 245, 255)", padding: "0 24px 93px", display: "flex", width: "100%", overflow: 'initial' }}>
      <Modal centered
        footer={null}
        closable={false}
        bodyStyle={{ padding: "16px 24px" }}
        style={{ maxWidth: "384px", backdropFilter: 'blur(10px)' }}
        open={isAddTrainingError}
        onCancel={() => setIsAddTrainingError(false)}>
        <div style={{ alignItems: "flex-start", display: "flex", width: "100%", gap: "16px" }}>
          <CloseCircleOutlined
            style={{
              color: "#FF4D4F",
              fontSize: "24px"
            }} />
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div style={{ fontSize: "16px", fontWeight: 500, lineHeight: "21px" }}>При сохранении данных произошла <br />ошибка </div>
            <div style={{ color: "#262626", fontSize: "14px", lineHeight: "18px" }}>Придется попробовать еще раз.</div>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
              <Button
                style={{
                  fontSize: "14px",
                  height: "28px",
                  lineHeight: "18px"
                }}
                onClick={() => { setIsAddTrainingError(false) }} type="primary" key="console">
                Закрыть
              </Button>
            </div>
          </div>
        </div>

      </Modal>
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
                paddingTop: "34px",
                paddingBottom: "16px"
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
                    }}
                      onClick={() => editTraining(item)}
                    />
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
                type="primary" >
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
                  onSelect: (item) => onChangeDropdown(item?.item?.props?.name || undefined)
                }} trigger={['click']}>
                <span style={{ width: "100%" }} onClick={e => e.preventDefault()}>
                  <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    {selectedTypeOfTraining ? selectedTypeOfTraining : "Выбор типа тренировки"}
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </div>
            <Divider style={{ margin: "17.5px 0 0" }} />
            {!newAddedExercise.length ?
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
                maxHeight: "200px",
                overflowY: "auto",
                width: "100%", display:
                  "flex", gap: "8px", flexDirection: "column",
                paddingLeft: "12px",
                paddingRight: "12px",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}>

                {newAddedExercise.map((item, index) => (
                  <div style={{
                    display: "flex", width: "100%", justifyContent: "space-between"
                  }} key={`${item.name}-${index}`}>

                    <div style={{
                      color: "#8C8C8C"
                    }}>{item.name}</div>
                    <EditOutlined style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#2F54EB"

                    }}
                      onClick={() => setIsShowAddingExersice(true)}
                    />

                  </div>
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
                disabled={!selectedTypeOfTraining}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  height: "32px",
                  lineHeight: "18px"
                }}
                onClick={() => { setIsShowAddingExersice(true) }}
              >
                Добавить упражнение
              </Button>
              <Button
                type="link"
                loading={isAddLoading}
                disabled={(!newAddedExercise?.length || !selectedTypeOfTraining) && !isOldTraining()}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  height: "32px",
                  lineHeight: "18px"
                }}
                onClick={() => { saveCurrentTraining() }}
              >
                Сохранить
              </Button>
            </div>
          </div>
        }

      </Modal>
      <Drawer
        style={{
          zIndex: 1001
          // display: (screens?.xs) ? "block" : "none", <CloseOutlined />
        }}
        maskStyle={{ background: "none" }}
        placement={"right"}
        closable={false}
        onClose={() => onCloseExercise()}
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
          <CloseOutlined onClick={() => onCloseExercise()} style={{ cursor: "pointer" }} />

        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", paddingBottom: "16px", color: "#8C8C8C",
          fontSize: "14px", lineHeight: "18.2px"
        }}>
          <div>
            {selectedTypeOfTraining && <Badge color={colors?.[selectedTypeOfTraining as keyof typeof colors] || "#EB2F96"}
              text={selectedTypeOfTraining} />}
          </div>
          <div>{dayjs().format("l")}</div>

        </div>
        <div style={{
          padding: screens.xs ? "0 0 24px " : "0 0 24px"
        }}>
          {newAddedExercise.map((item, index) => {
            return <ExserciseItem isOldTraining={isOldTraining} key={item?.unicKyeForDev || `${dayjs().valueOf()} - ${index}`} itemObj={item} changeItemObj={changeItemObj} />
          })
          }
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
              onClick={() => { setNewAddedExercise(v => { return [...v, { ...defaultExercise, unicKyeForDev: dayjs().valueOf() }] }) }}
            >
              Добавить еще
            </Button>
            {isOldTraining() && <Button
              disabled={!newAddedExercise.find(item => item?.isSelectedForDelete)}
              type="link"
              icon={<MinusOutlined />}
              // disabled={trainingList.length <= trainingsSelected.length}
              style={{
                height: "100%",
                width: "100%",
                fontSize: "14px",
                lineHeight: "18px"
              }}
              onClick={() => { removeSelectedExersices() }}
            >
              Удалить
            </Button>}
          </div>
        </div>
        {!dayjs().isBefore(dayjs(selectedDate), "day") && <div style={{
          textAlign: "center",
          color: "#8C8C8C",
          fontSize: "12px",
          lineHeight: "15.6px",
          paddingBottom: screens.xs ? "12px" : "32px"
        }}>
          После сохранения внесенных изменений <br />отредактировать проведенную тренировку <br /> будет невозможно
        </div>}
      </Drawer>
    </Content >
  )
};
