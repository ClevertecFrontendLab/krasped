import { Content } from "antd/lib/layout/layout"
import { _409, _Colors, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Badge, Button, Grid, Pagination, Select, Table, TableColumnsType, TableProps, Tabs } from "antd"
import { useState } from "react";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { selectTrainings } from "@redux/trainingSlice";
import { IParameters, ITraining } from "@redux/api/training/training.types";

const periotSorting = [
  { label: "Сортировка по периоду", value: "period" },
  { label: "Сортировка по дате", value: "date" },
  { label: "Сортировка по дням", value: "day" },
  { label: "Сортировка по всему", value: "all" },
]


export const MyTrainingsTab = ({ isHideAddTrainingBtn }: { isHideAddTrainingBtn: boolean }) => {
  const { useBreakpoint } = Grid;
  const trainings = useAppSelector(selectTrainings)
  const screens = useBreakpoint();
  const [selectedSortingType, setSelectedSortingType] = useState<string>("0")

  const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

  };

  const onChange: TableProps<ITraining>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onChangeDropdown = (name: string) => {
    setSelectedSortingType(name)
  }

  const columns: TableColumnsType<ITraining> = [
    {
      title: <span style={{
        paddingLeft: "11px",
        display: "flex", 
        alignItems: "center",
      backgroundColor: "#F0F0F0", 
      width: "100%", 
      height: "30px"}}>Тип тренировки</span>,
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
        style={{backgroundColor: "#F0F0F0", width: "100%", height: "100%"}}
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
      }}>{item.parameters.period || item.date}</span>,
    },
    {
      title: '',
      render: (item: IParameters) => <span>{item.period}</span>,
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
      </div>


        :
        <div>12314</div>
      }
      {/* <div
        style={{ display: "flex", gap: "12px", maxWidth: "511px", width: "100%", height: "32px" }}
      >
        <div
          style={{
            fontSize: "12px",
            backgroundColor: "#F0F0F0",
            width: screens.xs ? "116px" : screens.lg ? "259px" : "234px"
          }}
        >
          Тип тренировки
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 500,
            backgroundColor: "#F0F0F0",
            color: "",
            width: screens.xs ? "188px" : "240px"
          }}
        >
          <Select
            bordered={false}
            style={{ width: "100%" }}
            defaultValue={"1"}
            dropdownMatchSelectWidth={false}
            onChange={onChangeDropdown}
            placeholder="Сортировка"
            suffixIcon={<DownOutlined style={{color: "#000000"}} />}
          >
            {periotSorting.map(item => (
              <Option key={item.label} value={item.value}>{item.label}</Option>
            ))}
          </Select>
        </div>
      </div>
      {sortedData.map(item => (<div
        style={{
          fontSize: "14px",
          paddingTop: screens.xs ? "12px" : "24px"
        }}
      >
        <div
          style={{
            width: screens.xs ? "116px" : screens.lg ? "259px" : "234px"
          }}
        >1</div>
        <div>2</div>
        <div>3</div>
      </div>))} */}
      {!isHideAddTrainingBtn && <div
        style={{
          paddingTop: screens.xs ? "20px" : "54px"
        }}
      >
        <Button
          icon={<PlusOutlined />}
          onClick={() => { }} size="large" style={{ width: screens.xs ? "100%" : "" }} type="primary" htmlType="submit" className="login-form-button">
          Новая тренировка
        </Button>
      </div>}
    </Content >
  )
}