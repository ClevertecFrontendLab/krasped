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
  },
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
  },
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
  },
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
  const [page, setPage] = useState<number>(1)
  const indexOfLastContent = page * (screens.xs ? 8 : 12);
  const indexOfFirstContent = indexOfLastContent - (screens.xs ? 8 : 12);
  const currentContents = filtredItems.slice(indexOfFirstContent, indexOfLastContent);


  const handleChangePage = (page: number) => {
    setPage(page)
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
      <div>{((screens.xs && filtredItems.length > 8) || (filtredItems.length > 12)) && <Pagination
        onChange={handleChangePage}
        current={page}
        total={filtredItems.length}
        pageSize={screens.xs ? 8 : 12}
        size="small" />}</div>
    </Content >
  )
}