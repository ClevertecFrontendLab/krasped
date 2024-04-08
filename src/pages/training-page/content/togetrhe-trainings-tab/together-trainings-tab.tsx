import { Content } from "antd/lib/layout/layout"
import { _409, _Error, _ErrorUserExist, _Success } from "@config/constants";

import { Grid, Input, Pagination, Tabs } from "antd"
import { useState } from "react";
import { IItem, TrainingCard } from "./training-card/training-card";

const filtredItems: IItem[] = [
  {
    fullName: "Artem kradsfwtsow",
    imageSrc: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
  },
  {
    fullName: "Artem krassswtsow",
    imageSrc: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
  },
  {
    fullName: "Artem krawtsow",
    imageSrc: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
  },
  {
    fullName: "Ardtem krawtsow",
    imageSrc: "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
  }
]


export const TogetherTrainingsTab = () => {
  const { Search } = Input;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [searchValue, setSearchValue] = useState('');


  const handleChangePage = (page: number) => {
    console.log(page)
  }

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Content style={{
      padding: "24px",
      boxSizing: "border-box",
      borderRadius: screens.xs ? 0 : "8px",
      backgroundColor: "white",

      height: "100%",
      overflow: 'initial',
      position: "relative",
    }}>
      <div>
        <Search placeholder="Поиск по имени" onSearch={handleSearch} style={{ width: 200 }} />
        {/* <Input placeholder="Поиск по имени" value={searchValue} onChange={handleSearch} /> */}
      </div>
      <div style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}>
        {filtredItems.map(item => {
          return (
            <TrainingCard item={item} searchValue={searchValue} />
          )
        })}


        {/* <TrainingCard item={item} />
        <TrainingCard item={item} />
        <TrainingCard item={item} />
        <TrainingCard item={item} />
        <TrainingCard item={item} />
        <TrainingCard item={item} />
        <TrainingCard item={item} /> */}
      </div>
      <div><Pagination
        onChange={handleChangePage}
        total={50}
        pageSize={screens.xs ? 8 : 12}
        size="small" /></div>
    </Content >
  )
}