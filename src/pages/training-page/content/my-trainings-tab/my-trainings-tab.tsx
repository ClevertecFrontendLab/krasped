import { Content } from "antd/lib/layout/layout"
import { _403, _409, _AuthLogin, _Colors, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Badge, Button, Checkbox, DatePicker, Divider, Drawer, Grid, Image, Modal, Pagination, Select, Table, TableColumnsType, TableProps } from "antd"
import React, { RefObject, useEffect, useRef, useState } from "react";
import { CloseCircleOutlined, CloseOutlined, DownOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { selectTrainingList, selectTrainings } from "@redux/trainingSlice";
import { IExercise, ITraining, ITrainingReq } from "@redux/api/training/training.types";
import dayjs, { Dayjs } from "dayjs";
import { ExserciseItem } from "./exsercise-item-form";
import CalenderSVG from "@assets/icons/calendat-disabled.svg"
import { logout } from "@redux/userSlice";
import { history } from "@redux/configure-store";
import { useAddTrainingMutation, useUpdateTrainingMutation } from "@redux/api/training/training";
import { TrainingModal } from "./training-modal";
import useWindowWidth from "@hooks/use-window-width";

const periotSorting = [
  { label: "Сортировка по периоду", value: "period" },
  { label: "Сортировка по дате", value: "date" },
  { label: "Сортировка по дням", value: "day" },
  { label: "Сортировка по всему", value: "all" },
]

const defaultExercise = {
  "name": "",
  "replays": 1,
  "weight": 0,
  "approaches": 1,
  "isImplementation": false,
  "isSelectedForDelete": false,
}

const _Periods = [
  { key: "1", name: "Через 1 день" },
  { key: "2", name: "Через 2 дня" },
  { key: "3", name: "Через 3 дня" },
  { key: "4", name: "Через 4 дня" },
  { key: "5", name: "Через 5 дней" },
  { key: "6", name: "Через 6 дней" },
  { key: "7", name: "1 раз в неделю" },
]

export const MyTrainingsTab = ({ isHideAddTrainingBtn }: { isHideAddTrainingBtn: boolean }) => {
  const [AddTraining, { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError, error: addError }] = useAddTrainingMutation();
  const [UpdateTraining, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError, error: updateError }] = useUpdateTrainingMutation();
  const dispatch = useAppDispatch()
  type UserRefObject = {
    [key: string]: HTMLDivElement | null;
  }
  const { useBreakpoint } = Grid;

  const Icon = React.createElement(Image, {
    src: CalenderSVG,
    preview: false,
    alt: CalenderSVG,
  })

  const width = useWindowWidth()
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isOpenModal, setIsOpenModal] = useState<ITraining | undefined>();
  const trainings = useAppSelector(selectTrainings)
  const trainingList = useAppSelector(selectTrainingList)
  const screens = useBreakpoint();
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(false)
  const [selectedSortingType, setSelectedSortingType] = useState<string>("0")
  const [selectedTypeOfTraining, setSelectedTypeOfTraining] = useState<ITrainingReq>();
  const [newAddedExercise, setNewAddedExercise] = useState<IExercise[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [isRepeat, setIsRepeat] = useState<boolean>();
  const [selectedRepeat, setSelectedRepeat] = useState<string>("1");
  const [trainingsSelected, setTrainingsSelected] = useState<ITraining[]>([]);
  // const [dayOfRepeat, setDayOfRepeat] = useState<string>("1");
  const [isAddTrainingError, setIsAddTrainingError] = useState<boolean>(false)
  const [isPutError, setIsPutError] = useState<boolean>(false)
  const ulRefs: RefObject<UserRefObject> = useRef<UserRefObject>({});

  const handleSelectTraining = (item: ITraining) => {
    setNewAddedExercise(item?.exercises ? [...item.exercises] : [])
    const ulElement = ulRefs?.current?.[dayjs(item.date).format()] || null;
    if (ulElement) {
      const ulPosition = ulElement.getBoundingClientRect();
      if (ulPosition.left + 264 > width) ulPosition.left - 264 + ulPosition.width
      setModalPosition({
        top: ulPosition.top - 28,
        left: (ulPosition.left + 264 > width) ? (ulPosition.left - 264 + ulPosition.width + 8) : (ulPosition.left - 8)
      });
    }
    setIsOpenModal(item)
  };


  const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

  };

  const handleSelectDate = (value: Dayjs | undefined) => {
    if (!value) return
    const listOfTrainings = getListData(value)
    setTrainingsSelected(listOfTrainings)
    setSelectedDate(value);
  };

  const clearState = () => {
    setSelectedSortingType("0")
    setIsRepeat(false)
    setSelectedRepeat("1")
    setSelectedDate(undefined)
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    // setNewAddedExercise([])
    setTrainingsSelected([])
  }

  const fillStateByTraining = (training: ITrainingReq | undefined) => {

    setSelectedTypeOfTraining(training)
    setIsShowAddingExersice(true)
    
    handleSelectDate(training?.date ? dayjs(training?.date) : undefined)
    setIsRepeat(training?.parameters?.repeat || false)
    setSelectedRepeat(training?.parameters?.period?.toString() || "1")
    setNewAddedExercise(training?.exercises ? [...training.exercises] : [])
  }

  const onChange: TableProps<ITraining>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onChangeDropdown = (name: string) => {
    setSelectedSortingType(name)
  }

  const onChangeDropdownTraining = (name: string) => {
    const selectedTrain = getListData().find((item: ITraining) => item.name == name)
    console.log(selectedTrain)
    const defaultTraining: ITrainingReq = {
      name: name,
      "exercises": [{ unicKyeForDev: dayjs().valueOf(), ...defaultExercise }]
    }
    fillStateByTraining(selectedTrain?.name ? selectedTrain : defaultTraining)

  }

  const editTraining = (item: ITraining) => {
    // setNewAddedExercise(v => ([...v, ...item.exercises]));
    if(item?.isImplementation) return
    fillStateByTraining(item)
  }

  const createTraining = () => {
    setIsRepeat(false)
    setSelectedRepeat("1")
    setNewAddedExercise(v => ([...v, { ...defaultExercise, unicKyeForDev: dayjs().valueOf() }]));
    setSelectedDate(undefined)
    setIsShowAddingExersice(true)
    setSelectedTypeOfTraining(undefined)
    setTrainingsSelected([])
  }

  const saveCurrentTraining = () => {
    if (!selectedTypeOfTraining) return
    const old = trainingsSelected.find(item => item.name == selectedTypeOfTraining.name)
    const training: ITrainingReq = {
      ...old,
      isImplementation: checkIsFutureDay() ? false : true,
      name: selectedTypeOfTraining.name,
      date: dayjs(selectedDate).add(dayjs().utcOffset() / 60, 'hour').toISOString(),
      exercises: newAddedExercise,
      parameters: {
        repeat: !!isRepeat,
        period: selectedRepeat ? +selectedRepeat : 0,
        // jointTraining: ,
        // participants: [],
      }
    }
    if (old) {
      const { _id, ...rest } = training as ITraining
      UpdateTraining({ rest, _id })
    } else {
      AddTraining(training)
    }
  }

  const onCloseExercise = () => {
    // setNewAddedExercise(v => v.filter(item => item.name))
    clearState()
  }

  const removeSelectedExersices = () => {
    setNewAddedExercise(v => {
      return v.filter(item => !item?.isSelectedForDelete)
    })
  }

  const getListData = (value = selectedDate) => {
    if (!value) return []
    const training = trainings?.filter(item =>
      dayjs(item.date).isSame(dayjs(value), "day")
    )
    return training;
  };





  const checkIsFutureDay = (value = selectedDate) => {
    console.log(dayjs(), value)
    console.log(dayjs().isBefore(dayjs(value), "day"))
    return dayjs().isBefore(dayjs(value), "day")
  }

  const transformDropdownProps = () => {
    if (!selectedDate) return trainingList
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

  useEffect(() => {

    if (isAddSuccess) { clearState() }
    if (isAddError) {
      clearState()
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

    if (isUpdateSuccess) { clearState() }
    if (isUpdateError) {
      clearState()
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


  const columns: TableColumnsType<ITraining> = [
    {
      title: <span style={{
        paddingLeft: "11px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        width: "100%",
        height: "30px"
      }}>Тип тренировки</span>,
      dataIndex: '',
      render: ({ name }, item) => <div 
        ref={(ref) => (ulRefs.current !== null ? ulRefs.current[dayjs(item.date).format()] = ref : '')}
        style={{display: "flex", justifyContent: "space-between" ,cursor: "pointer"}} 
        onClick={() => handleSelectTraining(item)}>
        <Badge
          style={{
            width: "100%",
            borderBottom: "1px solid #F0F0F0"
          }}
          color={name?.isImplementation ? "#BFBFBF" : (_Colors?.[name as keyof typeof _Colors] || "#EB2F96")}
          text={<span
            style={{
              color: name?.isImplementation ? "#BFBFBF" : "inherit"
            }}>{name}
          </span>} />< DownOutlined />
      </div>
    },
    {
      title: <Select
        bordered={false}
        style={{ backgroundColor: "#F0F0F0", width: "100%", height: "100%" }}
        defaultValue={"period"}
        dropdownMatchSelectWidth={false}
        onChange={onChangeDropdown}
        placeholder="Сортировка"
        id="period-select"
        suffixIcon={<DownOutlined

          onClick={handleDropdownClick}
          style={{ color: "#000000", pointerEvents: "unset" }} />}
      >
        {periotSorting.map(item => (
          <Option key={item.label} value={item.value}>{item.label}</Option>
        ))}
      </Select>,
      dataIndex: '',
      sorter: {
        compare: (a, b) => a.parameters.period - b.parameters.period,
        multiple: 3,
      },
      render: (item: ITraining) => <span style={{
        display: "flex",
        width: "100%",
        height: "100%",
        borderBottom: "1px solid #F0F0F0"
      }}>{item?.parameters?.period ? _Periods[item.parameters.period - 1].name : dayjs(item.date).format('DD.MM.YYYY')}</span>,
    },
    {
      title: '',
      dataIndex: '',
      render: (item: ITraining) => <EditOutlined
        onClick={() => { editTraining(item); setIsOpenModal(undefined) }}
        style={{
          cursor: "pointer",
          fontSize: "25px",
          color: item?.isImplementation ? "#BFBFBF" : "#2F54EB"
        }} />
    },
  ];


  return (
    <Content
      className="configuredTable"
      style={{
        padding: "0px",
        boxSizing: "border-box",
        borderRadius: screens.xs ? 0 : "8px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: 'initial',
      }}>
      {isOpenModal && <Modal
        closeIcon={<CloseOutlined
        />}
        centered={screens.xs ? true : false}
        closable={false}
        width={screens.xs ? "calc(100% - 44px)" : 241}
        mask={false}
        footer={null}
        bodyStyle={{ padding: "16px 0 12px", height: "240px" }}
        style={screens.xs ? { margin: 0 } : { margin: 0, top: modalPosition.top, left: modalPosition.left }}
        open={!!isOpenModal}
        onCancel={() => { setIsOpenModal(undefined) }}
      >
        <TrainingModal newAddedExercise={newAddedExercise} item={isOpenModal} onBack={() => setIsOpenModal(undefined)} onOpenExersices={() => { editTraining(isOpenModal) }} />
      </Modal>}
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
          display: "flex",
          flexDirection: "column",
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
          > {selectedTypeOfTraining?.isImplementation ?
            <>{"Просмотр упражнений"}</>
            : selectedTypeOfTraining ?
              <><EditOutlined style={{ fontSize: "14px", paddingRight: "10px" }} />{"Редактирование"}</>
              :
              <><PlusOutlined style={{ fontSize: "14px", paddingRight: "10px" }} />{"Добавление упражнений"}</>}</div>
          <CloseOutlined data-test-id='modal-drawer-right-button-close' onClick={() => onCloseExercise()} style={{ cursor: "pointer" }} />

        </div>
        <div style={{
          display: "flex", justifyContent: "space-between", paddingBottom: "16px", color: "#8C8C8C",
          fontSize: "14px", lineHeight: "18.2px"
        }}>
          {/* <div>
            {selectedTypeOfTraining?.name && <Badge color={_Colors?.[selectedTypeOfTraining.name as keyof typeof _Colors] || "#EB2F96"}
              text={selectedTypeOfTraining.name} />}
          </div>
          {dayjs(selectedDate).format('DD.MM.YYYY')} */}
          <Select
            size="small"
            style={{ width: "100%" }}
            dropdownMatchSelectWidth={false}
            value={selectedTypeOfTraining?.name}
            onChange={onChangeDropdownTraining}
            placeholder="Выбор типа тренировки"
            suffixIcon={<DownOutlined />}
          >
            {transformDropdownProps().map(item => (
              <Option key={item.name} value={item.label}>{item.label}</Option>
            ))}
          </Select>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "8px",
        }}>
          <DatePicker
            onSelect={(value) => handleSelectDate(value as Dayjs)}
            value={dayjs(selectedDate)}
            suffixIcon={Icon}
            allowClear={false}
            style={{ width: "100%", maxWidth: "156px" }}
            size="small"
            placeholder={"Дата рождения"}
            format={'DD.MM.YYYY'} />
          <Checkbox checked={isRepeat} onChange={(e) => setIsRepeat(e.target.checked)}>
            С периодичностью
          </Checkbox>
        </div>
        {isRepeat && <div style={{
          display: "flex",
        }}>
          <Select
            size="small"
            style={{ width: "100%", maxWidth: "156px" }}
            dropdownMatchSelectWidth={false}
            defaultValue={"1"}
            value={selectedRepeat}
            onChange={setSelectedRepeat}
            placeholder="Выбор типа тренировки"
            suffixIcon={<DownOutlined />}
          >{
              _Periods.map(item => (
                <Option key={item.key} value={item.key}>{item.name}</Option>
              ))
            }
          </Select>
          {/* {selectedRepeat == "4" && <Select
            style={{ width: "100%" }}
            dropdownMatchSelectWidth={false}
            defaultValue={"1"}
            value={dayOfRepeat}
            onChange={setDayOfRepeat}
            placeholder="День недели"
            suffixIcon={<DownOutlined />}
          >
            <Option key={"1"} value={"1"}>Понедельник</Option>
            <Option key={"2"} value={"2"}>Вторник</Option>
            <Option key={"3"} value={"3"}>Срелда</Option>
            <Option key={"4"} value={"4"}>Четверг</Option>
            <Option key={"5"} value={"5"}>Пятница</Option>
            <Option key={"6"} value={"6"}>Суббока</Option>
            <Option key={"7"} value={"7"}>Воскресенье</Option>
          </Select>} */}
        </div>}
        <div style={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          height: "calc(100dvh - 205px)",
          padding: screens.xs ? "24px 0 24px " : "24px 0 24px"
        }}>
          {newAddedExercise.map((item, index) => {
            return <ExserciseItem index={index}
              isImplementation={!!selectedTypeOfTraining?.isImplementation}
              isOldTraining={!!selectedTypeOfTraining?._id}
              key={item?.unicKyeForDev || `${dayjs().valueOf()} - ${index}`}
              itemObj={item} changeItemObj={changeItemObj} />
          })
          }
          {!selectedTypeOfTraining?.isImplementation && <div style={{
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
            {selectedTypeOfTraining?._id && <Button
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
        <div style={{
          borderTop: "1px solid #F0F0F0",
          padding: "12px 32px",
          margin: screens.xs ? "0 -16px 0" : "0 -32px 0"
        }}>
          <Button
            type="primary"
            style={{
              width: "100%",
              fontSize: "14px",
              lineHeight: "18px"
            }}
            onClick={() => { saveCurrentTraining() }}
          >
            Сохранить
          </Button>
        </div>
      </Drawer>

      {trainings?.length ? <div>


        <Table
          pagination={{ defaultPageSize: screens.xs ? 8 : 14, position: ["bottomLeft"] }}
          bordered={false}
          showSorterTooltip={false}
          size="small"
          style={{
            maxWidth: "511px"
          }}
          columns={columns} dataSource={trainings} onChange={onChange} />
        {!isHideAddTrainingBtn && <div
          style={{
            paddingTop: screens.xs ? "20px" : "54px"
          }}
        >
          <Button
            icon={<PlusOutlined />}
            onClick={() => { createTraining() }} size="large" style={{ width: screens.xs ? "100%" : "" }} type="primary" htmlType="submit" className="login-form-button">
            Новая тренировка
          </Button>
        </div>}
      </div>
        :
        <div style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          // paddingTop: screens.xs ? "131px" : "200px"
        }}>
          <div style={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            lineHeight: "31px",
            flex: screens.xs ? 1 : "initial",
            fontWeight: 500,
            paddingBottom: screens.xs ? "20px" : "72px"
          }}>У вас еще нет созданных тренировок</div>
          {!isHideAddTrainingBtn && <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button
              icon={<PlusOutlined />}
              onClick={() => { createTraining() }} size="large" style={{ width: screens.xs ? "100%" : "" }} type="primary" htmlType="submit" className="login-form-button">
              Новая тренировка
            </Button>
          </div>}
        </div>
      }

    </Content >
  )
}