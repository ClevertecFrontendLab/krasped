import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './configure-store';
import { ITraining } from './api/training/training.types';
interface ITrainingsState {
  trainings: ITraining[] | [];
}

const initialState: ITrainingsState = {
  trainings: [],
};
export const trainingSlice = createSlice({
  initialState,
  name: 'trainingSlice',
  reducers: {
    setTrainings: (state, action: PayloadAction<ITraining[]>) => {
      state.trainings = action.payload;
    },

  },
});


export default trainingSlice.reducer;

export const selectTrainings = (state: RootState) => state.trainingState.trainings;

export const { setTrainings } = trainingSlice.actions;