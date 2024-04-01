import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { Button, Grid, Calendar, CalendarProps, Badge, Modal, Drawer, Image, Divider, Select } from "antd"
import { Content } from "antd/lib/layout/layout"
import { IExercise, ITraining, ITrainingReq } from "@redux/api/training/training.types"
import dayjs, { Dayjs } from "dayjs"
import { selectTrainingList, selectTrainings } from "@redux/trainingSlice"
import { RefObject, useEffect, useRef, useState } from "react"
import useWindowWidth from "@hooks/use-window-width"
import noTrainingsPng from "@assets/imgs/noTrainings.png"
import { ArrowLeftOutlined, CloseCircleOutlined, CloseOutlined, DownOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"

import { ExserciseItem } from "./exsercise-item-form"
import { useAddTrainingMutation, useUpdateTrainingMutation } from "@redux/api/training/training"
import { history } from "@redux/configure-store"
import { logout } from "@redux/userSlice"
import { Option } from "antd/lib/mentions"
import { _403, _AuthLogin, _Colors } from "@config/constants"



export const CalendarContent = () => {
  const dispatch = useAppDispatch()
  const [AddTraining, { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError, error: addError }] = useAddTrainingMutation();
  const [UpdateTraining, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateTrainingMutation();
  type UserRefObject = {
    [key: string]: HTMLUListElement | null;
  }
  const width = useWindowWidth()
  const ulRefs: RefObject<UserRefObject> = useRef<UserRefObject>({});
  const trainings = useAppSelector(selectTrainings)
  const trainingList = useAppSelector(selectTrainingList)
  const [isAddTrainingError, setIsAddTrainingError] = useState<boolean>(false)
  const [isPutError, setIsPutError] = useState<boolean>(false)
  const [isOpenFirstModal, setIsOpenFirstModal] = useState<boolean>(false)
  const [tabFirstModal, setTabFirstModal] = useState<number>(1)
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [selectedTypeOfTraining, setSelectedTypeOfTraining] = useState<string>();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [trainingsSelected, setTrainingsSelected] = useState<ITraining[]>([]);
  const [newAddedExercise, setNewAddedExercise] = useState<IExercise[]>([]);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const defaultExercise = {
    "name": "",
    "replays": 1,
    "weight": 0,
    "approaches": 1,
    "isImplementation": false,
    "isSelectedForDelete": false,
  }



  const changeTab = (value: number) => {
    setTabFirstModal(value)

  }

  const clearState = () => {
    setIsOpenFirstModal(false);
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    setTrainingsSelected([])
    setNewAddedExercise([])
  }
  const clearStateWithoutColse = () => {
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    setTrainingsSelected([])
    setNewAddedExercise([])
  }

  const getListData = (value = selectedDate) => {
    const training = trainings?.filter(item =>
      dayjs(item.date).isSame(dayjs(value), "day")
    )
    return training;
  };

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    setTimeout(() => setIsOpenFirstModal(false), 10)

  };

  const checkIsFutureDay = (value = selectedDate) => {
    return dayjs().isBefore(dayjs(value), "day")
  }

  const handleSelectDate = (value: Dayjs) => {
    setTabFirstModal(1)
    setIsOpenFirstModal(true);
    clearStateWithoutColse()
    const listOfTrainings = getListData(value)
    if (true) {
      const ulElement = ulRefs?.current?.[dayjs(value).format()] || null;
      if (ulElement) {
        const ulPosition = ulElement.getBoundingClientRect();
        if (ulPosition.left + 264 > width) ulPosition.left - 264 + ulPosition.width
        setModalPosition({
          top: ulPosition.top - 28,
          left: (ulPosition.left + 264 > width) ? (ulPosition.left - 264 + ulPosition.width + 8) : (ulPosition.left - 8)
        });
      }
      setTrainingsSelected(listOfTrainings)
      setSelectedDate(value);
    } else {
      clearState()
      return
    }

  };

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
        if (newEx?._id && item?._id == newEx?._id) { isChanged = true; return newEx }
        if (isChanged) return item
        if (newEx?.unicKyeForDev && item?.unicKyeForDev == newEx?.unicKyeForDev) { isChanged = true; return newEx }
        return item
      })
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
    setSelectedTypeOfTraining(training.name);
    setNewAddedExercise(training.exercises)
  }

  const showEditTraining = (training: ITraining) => {
    setSelectedTypeOfTraining(training.name);
    setNewAddedExercise(training.exercises)
    setIsShowAddingExersice(true)
  }

  const onChangeDropdown = (name: string | undefined) => {
    setSelectedTypeOfTraining(name)
    const selectedTrain = getListData().find(item => item.name == name)?.exercises || []
    if (checkIsFutureDay()) {
      setNewAddedExercise([...selectedTrain])
    } else {
      setNewAddedExercise([...selectedTrain])
    }
  }

  const isOldTraining = () => {
    return trainingsSelected.find(item => item.name == selectedTypeOfTraining)
  }

  const saveCurrentTraining = () => {
    if (!selectedTypeOfTraining) return
    const old = trainingsSelected.find(item => item.name == selectedTypeOfTraining)
    const training: ITrainingReq = {
      ...old,
      isImplementation: checkIsFutureDay() ? false : true,
      name: selectedTypeOfTraining,
      date: dayjs(selectedDate).add(dayjs().utcOffset() / 60, 'hour').toISOString(),
      exercises: newAddedExercise
    }
    setIsOpenFirstModal(true)
    setTabFirstModal(1)
    if (old) {
      const { _id, ...rest } = training as ITraining
      UpdateTraining({ rest, _id })
    } else {
      setIsOpenFirstModal(true)
      setTabFirstModal(1)
      AddTraining(training)
    }
  }

  const dateCellRender = (value: any) => {
    const listData = getListData(value);
    return (
      <ul style={{
        height: "100%", width: "100%"
      }}
        ref={(ref) => (ulRefs.current !== null ? ulRefs.current[dayjs(value).format()] = ref : '')}
        className="events">
        {listData.map(item => (
          <li key={item._id}>
            <Badge color={item.isImplementation ? "#BFBFBF" : (_Colors?.[item.name as keyof typeof _Colors] || "#EB2F96")}
              text={<span style={{ color: item.isImplementation ? "#BFBFBF" : "inherit" }}>{item.name}</span>} />
          </li>
        ))}
      </ul>
    );
  };

  const dateCellRenderMobile = (value: any) => {
    const listData = getListData(value);
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

    if (isAddSuccess && selectedDate) { clearStateWithoutColse(); setTrainingsSelected(getListData(selectedDate)) }
    if (isAddError) {
      clearStateWithoutColse()
      const customError = addError as { status: number }
      if (customError.status == _403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setSelectedDate(undefined)
      setIsAddTrainingError(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddLoading]);

  useEffect(() => {

    if (isUpdateSuccess && selectedDate) { clearStateWithoutColse(); setTrainingsSelected(getListData(selectedDate)) }
    if (isUpdateError) {
      clearStateWithoutColse()
      const customError = updateError as { status: number }
      if (customError.status == _403) {
        dispatch(logout())
        history.push(_AuthLogin)
      }
      setSelectedDate(undefined)
      setIsPutError(true)
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
        closeIcon={<CloseOutlined data-test-id='modal-error-user-training-button-close' />}
        bodyStyle={{ padding: "16px 24px" }}
        style={{ maxWidth: "384px", backdropFilter: 'blur(10px)' }}
        open={isPutError || isAddTrainingError}
        onCancel={() => { setIsPutError(false); setIsAddTrainingError(false) }}>
        <div style={{ alignItems: "flex-start", display: "flex", width: "100%", gap: "16px" }}>
          <CloseCircleOutlined
            style={{

              color: "#2F54EB",
              fontSize: "24px"
            }} />
          <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div
              data-test-id='modal-error-user-training-title'
              style={{ fontSize: "16px", lineHeight: "21px" }}>При сохранении данных произошла ошибка</div>
            <div
              data-test-id='modal-error-user-training-subtitle'
              style={{ color: "#8C8C8C", fontSize: "14px", lineHeight: "18px" }}>Придётся попробовать ещё раз</div>
            <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
              <Button
                data-test-id='modal-error-user-training-button'
                style={{
                  fontSize: "14px",
                  height: "28px",
                  lineHeight: "18px"
                }}
                onClick={() => {
                  setIsPutError(false); setIsAddTrainingError(false); clearState()
                }} type="primary" key="console">
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
            onSelect={(value) => handleSelectDate(value as Dayjs)}
            fullscreen={false}
            onPanelChange={(value, mode) => onPanelChange(value as Dayjs, mode)} />
        </div>
        :
        <div className="calendar-desctop">
          <Calendar style={{ padding: 0, backgroundColor: "rgb(240, 245, 255)" }}
            onSelect={(value) => handleSelectDate(value as Dayjs)}
            dateCellRender={dateCellRender}
            onPanelChange={(value, mode) => onPanelChange(value as Dayjs, mode)}
          />
        </div>
      }
      {isOpenFirstModal && <Modal
        closeIcon={<CloseOutlined
          data-test-id='modal-create-training-button-close'
        />}
        data-test-id={tabFirstModal == 2 ? 'modal-create-exercise' : 'modal-create-training'}
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
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
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
            {!trainingsSelected?.length ?
              <div style={{

                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "32px 0 16px 0"
              }}>
                <Image
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
                  <Button type="text" disabled={item.isImplementation} style={{
                    display: "flex", justifyContent: "space-between"
                  }} key={item.name}
                    data-test-id={`modal-update-training-edit-button` + `${index}`}
                    onClick={() => {
                      setTabFirstModal(2)
                      if (item.isImplementation) {
                        showEditTraining(item)
                      } else {
                        editTraining(item)
                      }
                    }}
                  >
                    <Badge color={item.isImplementation ? "#BFBFBF" : (_Colors?.[item.name as keyof typeof _Colors] || "#EB2F96")}

                      text={item.name} />
                    <EditOutlined style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: item.isImplementation ? "#BFBFBF" : "#2F54EB"
                    }}

                    />
                  </Button>
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
                {"Создать тренировку"}
              </Button>
            </div>

          </div>
          :
          <div
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "column",
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
              <Select
                bordered={false}
                data-test-id='modal-create-exercise-select'
                style={{ width: "100%" }}
                dropdownMatchSelectWidth={false}
                onChange={onChangeDropdown}
                placeholder="Выбор типа тренировки"
                suffixIcon={<DownOutlined />}
              >
                {transformDropdownProps().map(item => (
                  <Option key={item.name} value={item.label}>{item.label}</Option>
                ))}
              </Select>
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
                  }} key={`${item.name}-${index}`}
                    data-test-id={`modal-update-training-edit-button` + `${index}`}
                    onClick={() => setIsShowAddingExersice(true)}
                  >

                    <div style={{
                      color: "#8C8C8C"
                    }}>{item.name}</div>
                    <EditOutlined style={{
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#2F54EB"

                    }}
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
                onClick={() => { setNewAddedExercise(v => ([...v, { ...defaultExercise, unicKyeForDev: dayjs().valueOf() }])); setIsShowAddingExersice(true) }}
              >
                Добавить упражнения
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
                {tabFirstModal == 2 ? "Сохранить изменения" : "Сохранить"}

              </Button>
            </div>
          </div>
        }

      </Modal>}
      <Drawer
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
            {selectedTypeOfTraining && <Badge color={_Colors?.[selectedTypeOfTraining as keyof typeof _Colors] || "#EB2F96"}
              text={selectedTypeOfTraining} />}
          </div>
          {dayjs(selectedDate).format('DD.MM.YYYY')}

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
              Добавить ещё
            </Button>
            {isOldTraining() && <Button
              disabled={!newAddedExercise.find(item => item?.isSelectedForDelete)}
              type="link"
              icon={<MinusOutlined />}
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
