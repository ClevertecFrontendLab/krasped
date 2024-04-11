import { CloseOutlined, DownOutlined, EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Checkbox, DatePicker, Select } from "antd"
import { Option } from "antd/lib/mentions"
import dayjs from "dayjs"
import { IItem } from "./training-card/training-card"

export const DrowerContent = ({selectedUser, isShowAddingExersice, onCloseExercise}: {selectedUser: IItem, isShowAddingExersice: boolean, onCloseExercise: ()=>void}) => {
  return (
    <>
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
    </>
  )
}