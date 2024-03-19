import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { selectIsShowAllFeedbacks } from "@redux/feedbackSlice"
import { Card, Button, Avatar, Rate, Grid, Calendar, CalendarProps, ConfigProvider, Badge, BadgeProps, Modal, Drawer, Image, Divider, Dropdown, Space, MenuProps, Input, Checkbox } from "antd"
import { Content } from "antd/lib/layout/layout"
import { IExercise, IExerciseWithId, ITraining, ITrainingReq } from "@redux/api/training/training.types"
import dayjs, { Dayjs } from "dayjs"
import { selectIsShowCalendarDate, selectTrainingList, selectTrainings } from "@redux/trainingSlice"
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  // const [exerciseSelected, setExerciseSelected] = useState<IExerciseWithId[]>([]);
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



  const changeTab = (value: number) => {
    setTabFirstModal(value)

  }

  const clearState = () => {
    setIsOpenFirstModal(false);
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    setTrainingsSelected([])
    // setExerciseSelected([])
    // setNewAddedTrainings([])
    setNewAddedExercise([])
  }
  const clearStateWithoutColse = () => {
    // setIsOpenFirstModal(false);
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    setTrainingsSelected([])
    // setExerciseSelected([])
    // setNewAddedTrainings([])
    setNewAddedExercise([])
  }

  const getListData = (value = selectedDate) => {
    const training = trainings?.filter(item =>
      dayjs(item.date).isSame(dayjs(value), "day")
    )
    return training;
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log("panel")
    setTimeout(() => setIsOpenFirstModal(false), 10)

  };

  const checkIsFutureDay = (value = selectedDate) => {
    return dayjs().isBefore(dayjs(value), "day")
  }

  const handleSelectDate = (value: Dayjs) => {
    clearStateWithoutColse()
    const listOfTrainings = getListData(value)
    if (checkIsFutureDay(value) || listOfTrainings.length) {
      // if (true) {
      setTabFirstModal(1)
      setTimeout(() => {
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
      }, 0)
      setTrainingsSelected(listOfTrainings)
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
    if (checkIsFutureDay()) {
      const uniqueTrainingNames = new Set(trainingsSelected.map(item => item.name));
      return trainingList
        .filter(item => !uniqueTrainingNames.has(item.name))
        .map(item => {
          return { ...item, label: item.name };
        });
    } else {
      const pastTrainings = getListData();
      const uniqueTrainingNames = new Set(pastTrainings.map(item => item.name))
      return trainingList
        .filter(item => uniqueTrainingNames.has(item.name))
        .map(item => {
          return { ...item, label: item.name };
        });
    }
  }

  const changeItemObj = (newEx: IExercise) => {

    let isChanged = false
    setNewAddedExercise(v => {
      const newExe = v.map(item => {
        console.log(item?._id)
        console.log(newEx?._id)
        console.log(item?.unicKyeForDev)
        console.log(newEx?.unicKyeForDev)
        console.log(item?.unicKyeForDev === newEx?.unicKyeForDev, item?._id == newEx?._id)
        if (newEx?._id && item?._id == newEx?._id) { isChanged = true; return newEx }
        if (isChanged) return item
        if (newEx?.unicKyeForDev && item?.unicKyeForDev == newEx?.unicKyeForDev) { isChanged = true; return newEx }
        // if (!item?.unicKyeForDev && !newEx?.unicKyeForDev && (item?.name == newEx?.name)) return newEx
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
    // setExerciseSelected(training.exercises)
    // setNewAddedTrainings([])
    setNewAddedExercise(training.exercises)
  }

  const showEditTraining = (training: ITraining) => {
    setSelectedTypeOfTraining(training.name);
    // setExerciseSelected(training.exercises)
    // setNewAddedTrainings([])
    setNewAddedExercise(training.exercises)
    setIsShowAddingExersice(true)
  }

  const onChangeDropdown = (name: string | undefined) => {
    setSelectedTypeOfTraining(name)
    const selectedTrain = getListData().find(item => item.name == name)?.exercises || []
    //если будующее
    if (checkIsFutureDay()) {
      // setExerciseSelected([])
      setNewAddedExercise([...selectedTrain])
    } else {
      // setExerciseSelected([])
      setNewAddedExercise([...selectedTrain])
    }
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
      //возможны ошибки касательно того что может компличеная тренировка стать нет
      isImplementation: checkIsFutureDay() ? false : true,
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
            <Badge color={item.isImplementation ? "#BFBFBF" : (colors?.[item.name as keyof typeof colors] || "#EB2F96")}
              // status={item.type as BadgeProps['status']}
              text={<span style={{ color: item.isImplementation ? "#BFBFBF" : "inherit" }}>{item.name}</span>} />
          </li>
        ))}
      </ul>
    );
  };

  const dateCellRenderMobile = (value: any) => {
    const listData = getListData(value);
    console.log(dayjs(value).isSame(dayjs(), "day"))
    if (listData?.length) {
      return (
        <ul style={{
          marginTop: "-24px",
          height: "24px", width: "100%",
          background: (dayjs(value).isSame(dayjs(selectedDate, "day")) || dayjs(value).isSame(dayjs(), "day")) ? "" : "#F0F5FF",
        }}
          ref={(ref) => (ulRefs.current !== null ? ulRefs.current[dayjs(value).format()] = ref : '')}
          className="events">
        </ul>
      );
    } else {
      return (
        <ul style={{
          marginTop: "-24px",
          height: "24px", width: "100%",
        }}
          ref={(ref) => (ulRefs.current !== null ? ulRefs.current[dayjs(value).format()] = ref : '')}
          className="events">
        </ul>
      );
    }

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
      {screens.xs ?
        <div className="calendar-card">
          <Calendar
            dateCellRender={dateCellRenderMobile}
            style={{ padding: 0, backgroundColor: "white" }}
            // dateCellRender={dateCellRender}
            onSelect={(value) => handleSelectDate(value as Dayjs)}
            fullscreen={false}
            onPanelChange={(value, mode) => onPanelChange(value as Dayjs, mode)} />
        </div>
        :

        <Calendar style={{ padding: 0, backgroundColor: "rgb(240, 245, 255)" }}
          onSelect={(value) => handleSelectDate(value as Dayjs)}
          dateCellRender={dateCellRender}
          onPanelChange={(value, mode) => onPanelChange(value as Dayjs, mode)}
        />
      }
      <Modal
        closeIcon={<CloseOutlined
          data-test-id='modal-create-training-button-close'
        />}

        centered={screens.xs ? true : false}
        closable={tabFirstModal == 1}
        width={screens.xs ? "calc(100% - 44px)" : 264}
        mask={false}
        footer={null}
        bodyStyle={{ padding: "16px 0 12px" }}
        style={screens.xs ? { margin: 0 } : { margin: 0, top: modalPosition.top, left: modalPosition.left }}
        open={isOpenFirstModal}
        onCancel={() => { setIsOpenFirstModal(false) }}
      >
        {tabFirstModal == 1 ?
          <div
            data-test-id='modal-create-training'
            style={{
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
                    <Badge color={item.isImplementation ? "#BFBFBF" : (colors?.[item.name as keyof typeof colors] || "#EB2F96")}

                      // status={item.type as BadgeProps['status']}
                      text={item.name} />
                    <EditOutlined style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: item.isImplementation ? "#BFBFBF" : "#2F54EB"
                    }}
                      data-test-id={`modal-update-training-edit-button${index}`}
                      onClick={() => (item.isImplementation ? showEditTraining(item) : editTraining(item))}
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
                disabled={trainingList.length <= trainingsSelected.length || !checkIsFutureDay()}
                style={{
                  width: "100%",
                  fontSize: "14px",
                  height: "40px",
                  lineHeight: "18px"
                }}
                onClick={() => changeTab(2)}
                type="primary" >
                {/* {trainingsSelected.length ? "Добавить тренировку" : "Создать тренировку"} */}
                {"Создать тренировку"}
              </Button>
            </div>

          </div>
          :
          <div
            data-test-id='modal-create-exercise'
            style={{
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
              <ArrowLeftOutlined data-test-id='modal-exercise-training-button-close' onClick={() => { changeTab(1) }} />
              <Dropdown
                menu={{
                  items: transformDropdownProps(),
                  selectable: true,
                  onSelect: (item) => onChangeDropdown(item?.item?.props?.name || undefined)
                }} trigger={['click']}>
                <span style={{ width: "100%" }} onClick={e => e.preventDefault()}>
                  <Space style={{ width: "100%", justifyContent: "space-between" }}>
                    {selectedTypeOfTraining ? selectedTypeOfTraining : "Выбор типа тренировки"}
                    <DownOutlined data-test-id='modal-create-exercise-select' />
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
        data-test-id='modal-drawer-right'
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
        width={screens.xs ? "100%" : 408}
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
          > {getListData()?.find(item => item.name == selectedTypeOfTraining)?.isImplementation ?
            <>{"Просмотр упражнений"}</>
            : getListData()?.find(item => item.name == selectedTypeOfTraining) ?
              <><EditOutlined style={{ fontSize: "14px", paddingRight: "10px" }} />{"Редактирование"}</>
              :
              <><PlusOutlined style={{ fontSize: "14px", paddingRight: "10px" }} />{"Добавление упражнений"}</>}</div>
          <CloseOutlined data-test-id='modal-drawer-right-button-close' onClick={() => onCloseExercise()} style={{ cursor: "pointer" }} />

        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", paddingBottom: "16px", color: "#8C8C8C",
          fontSize: "14px", lineHeight: "18.2px"
        }}>
          <div>
            {selectedTypeOfTraining && <Badge color={colors?.[selectedTypeOfTraining as keyof typeof colors] || "#EB2F96"}
              text={selectedTypeOfTraining} />}
          </div>
          <div>{dayjs(selectedDate).format("l")}</div>

        </div>
        <div style={{
          padding: screens.xs ? "0 0 24px " : "0 0 24px"
        }}>
          {newAddedExercise.map((item, index) => {
            return <ExserciseItem index={index} isImplementation={!!getListData()?.find(item => item.name == selectedTypeOfTraining)?.isImplementation} isOldTraining={isOldTraining} key={item?.unicKyeForDev || `${dayjs().valueOf()} - ${index}`} itemObj={item} changeItemObj={changeItemObj} />
          })
          }
          {!getListData()?.find(item => item.name == selectedTypeOfTraining)?.isImplementation && <div style={{
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
          </div>}
        </div>
        {(!checkIsFutureDay() && !getListData()?.find(item => item.name == selectedTypeOfTraining)?.isImplementation) && <div style={{
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
