import { Content } from "antd/lib/layout/layout"
import { _409, _Colors, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Badge, Button, Checkbox, DatePicker, Divider, Drawer, Grid, Image, Pagination, Select, Table, TableColumnsType, TableProps } from "antd"
import React, { RefObject, useRef, useState } from "react";
import { CloseOutlined, DownOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { selectTrainingList, selectTrainings } from "@redux/trainingSlice";
import { IExercise, ITraining } from "@redux/api/training/training.types";
import dayjs, { Dayjs } from "dayjs";
import { ExserciseItem } from "./exsercise-item-form";
import CalenderSVG from "@assets/icons/calendat-disabled.svg"

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

export const MyTrainingsTab = ({ isHideAddTrainingBtn }: { isHideAddTrainingBtn: boolean }) => {
  type UserRefObject = {
    [key: string]: HTMLUListElement | null;
  }
  const { useBreakpoint } = Grid;

  const Icon = React.createElement(Image, {
    src: CalenderSVG,
    preview: false,
    alt: CalenderSVG,
  })

  const trainings = useAppSelector(selectTrainings)
  const trainingList = useAppSelector(selectTrainingList)
  const screens = useBreakpoint();
  const [selectedSortingType, setSelectedSortingType] = useState<string>("0")
  const [isShowAddingExersice, setIsShowAddingExersice] = useState<boolean>(false)
  const [selectedTypeOfTraining, setSelectedTypeOfTraining] = useState<ITraining>();
  const [newAddedExercise, setNewAddedExercise] = useState<IExercise[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [isRepeat, setIsRepeat] = useState<boolean>();
  const [selectedRepeat, setSelectedRepeat] = useState<string>();
  const [dayOfRepeat, setDayOfRepeat] = useState<string>("1");
  const [trainingsSelected, setTrainingsSelected] = useState<ITraining[]>([]);
  const ulRefs: RefObject<UserRefObject> = useRef<UserRefObject>({});




  const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

  };

  const clearState = () => {
    setSelectedDate(undefined)
    setIsShowAddingExersice(false);
    setSelectedTypeOfTraining(undefined);
    setNewAddedExercise([])
  }

  const onChange: TableProps<ITraining>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onChangeDropdown = (name: string) => {
    setSelectedSortingType(name)
  }

  const onChangeDropdownTraining = (name: string) => {
    const selectedTrain = getListData().find((item: ITraining) => item.name == name)
    setSelectedTypeOfTraining(selectedTrain)
    // if (checkIsFutureDay()) {
    setNewAddedExercise(selectedTrain?.exercises ? [...selectedTrain.exercises] : [])
    // } else {
    //   setNewAddedExercise(selectedTrain?.exercises ? [...selectedTrain?.exercises] : [])
    // }
  }

  const editTraining = (item: ITraining) => {
    setNewAddedExercise(v => ([...v, ...item.exercises]));
    console.log(item)
    setSelectedDate(dayjs(item?.date))
    setIsShowAddingExersice(true)
    setSelectedTypeOfTraining(item)
  }

  const createTraining = () => {
    setNewAddedExercise(v => ([...v, { ...defaultExercise, unicKyeForDev: dayjs().valueOf() }]));
    setIsShowAddingExersice(true)
    setSelectedDate(undefined)
    setIsShowAddingExersice(true)
    setSelectedTypeOfTraining(undefined)
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

  const onCloseExercise = () => {
    setNewAddedExercise(v => v.filter(item => item.name))
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

  const handleSelectDate = (value: Dayjs) => {
    const listOfTrainings = getListData(value)
    setTrainingsSelected(listOfTrainings)
    setSelectedDate(value);
  };



  const checkIsFutureDay = (value = selectedDate) => {
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
      dataIndex: 'name',
      render: (item) => <Badge
        style={{
          width: "100%",
          borderBottom: "1px solid #F0F0F0"
        }}
        color={item?.isImplementation ? "#BFBFBF" : (_Colors?.[item as keyof typeof _Colors] || "#EB2F96")}
        text={<span style={{ color: item?.isImplementation ? "#BFBFBF" : "inherit" }}>{item}</span>} />,
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
      }}>{item.parameters.period || dayjs(item.date).format('DD.MM.YYYY')}</span>,
    },
    {
      title: '',
      dataIndex: '',
      render: (item: ITraining) => <EditOutlined
        onClick={() => { editTraining(item) }}
        style={{
          cursor: "pointer",
          fontSize: "25px",
          color: "#2F54EB"
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
        <div>
          <DatePicker
            onSelect={(value) => handleSelectDate(value as Dayjs)}
            value={dayjs(selectedDate)}
            suffixIcon={Icon}
            allowClear={false}
            style={{ width: "100%" }}
            size="large"
            placeholder={"Дата рождения"}
            format={'DD.MM.YYYY'} />
          <Checkbox checked={isRepeat} onChange={(e) => setIsRepeat(e.target.checked)}>
            С периодичностью
          </Checkbox>
        </div>
        <div style={{
          display: "flex",
        }}>
          <Select
            style={{ width: "100%" }}
            dropdownMatchSelectWidth={false}
            defaultValue={"1"}
            value={selectedRepeat}
            onChange={setSelectedRepeat}
            placeholder="Выбор типа тренировки"
            suffixIcon={<DownOutlined />}
          >
            <Option key={"1"} value={"1"}>Через 1 день</Option>
            <Option key={"2"} value={"2"}>Через 2 дня</Option>
            <Option key={"3"} value={"3"}>Через 3 дня</Option>
            <Option key={"4"} value={"4"}>День недели</Option>
          </Select>
          {selectedRepeat == "4" && <Select
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
          </Select>}
        </div>
        <div style={{
          padding: screens.xs ? "0 0 24px " : "0 0 24px"
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
        <div>
          <Divider style={{ margin: "17.5px 0 0" }} />
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
          bordered={false}
          pagination={false}
          showSorterTooltip={false}
          size="small"
          style={{
            maxWidth: "511px"
          }}
          columns={columns} dataSource={trainings} onChange={onChange} />
        {(
          (screens.xs && trainings?.length > 8) ||
          (!screens.xs && trainings?.length > 14)
        ) && <Pagination
            defaultPageSize={screens.xs ? 8 : 14}
          />}
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