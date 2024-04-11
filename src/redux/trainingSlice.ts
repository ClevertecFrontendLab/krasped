import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './configure-store';
import { ITraining } from './api/training/training.types';
import { ITrainingItem } from './api/catalog/catalog.types';
import { IItem } from '@pages/training-page/content/togetrhe-trainings-tab/training-card/training-card';
interface ITrainingsState {
  trainings: ITraining[] | [];
  trainingList: ITrainingItem[] | [];
  usersJoing: IItem[] | [];
  trainingPals: IItem[] | [];
  isShowCalendarDate: boolean
}

const initialState: ITrainingsState = {
  trainings: [],
  trainingList: [],
  usersJoing: [],
  trainingPals: [],
  isShowCalendarDate: false
};
export const trainingSlice = createSlice({
  initialState,
  name: 'trainingSlice',
  reducers: {
    setTrainings: (state, action: PayloadAction<ITraining[]>) => {
      state.trainings = action.payload;
    },
    setUsersJoing: (state, action: PayloadAction<IItem[]>) => {
      state.usersJoing = action.payload;
    },
    setTrainingPals: (state, action: PayloadAction<IItem[]>) => {
      state.trainingPals = action.payload;
    },
    setTrainingList: (state, action: PayloadAction<ITrainingItem[]>) => {
      state.trainingList = action.payload;
    },
    setIsShowCalendarDate: (state, action: PayloadAction<boolean>) => {
      state.isShowCalendarDate = action.payload;
    },
  },
});


export default trainingSlice.reducer;

export const selectTrainings = (state: RootState) => state.trainingState.trainings;
export const selectTrainingList = (state: RootState) => state.trainingState.trainingList;
export const selectIsShowCalendarDate = (state: RootState) => state.trainingState.isShowCalendarDate;
export const selectUsersJoing = (state: RootState) => state.trainingState.usersJoing;
export const selectTrainingPals = (state: RootState) => state.trainingState.trainingPals;

export const { setTrainings, setTrainingPals, setTrainingList, setIsShowCalendarDate, setUsersJoing } = trainingSlice.actions;