import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './configure-store';
import { ITraining } from './api/training/training.types';
import { ITrainingItem } from './api/catalog/catalog.types';
interface ITrainingsState {
  trainings: ITraining[] | [];
  trainingList: ITrainingItem[] | [];
  isShowCalendarDate: boolean
}

const initialState: ITrainingsState = {
  trainings: [],
  trainingList: [],
  isShowCalendarDate: false
};
export const trainingSlice = createSlice({
  initialState,
  name: 'trainingSlice',
  reducers: {
    setTrainings: (state, action: PayloadAction<ITraining[]>) => {
      state.trainings = action.payload;
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

export const { setTrainings, setTrainingList, setIsShowCalendarDate } = trainingSlice.actions;