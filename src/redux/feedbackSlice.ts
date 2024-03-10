import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeedback } from '@redux/api/feedback/feedback.types';
import { RootState } from './configure-store';
interface IFeedbacksState {
  feedbacks: IFeedback[] | [];
  isShowAllFeedbacks: boolean;
}

const initialState: IFeedbacksState = {
  feedbacks: [],
  isShowAllFeedbacks: false
};
export const feedbackSlice = createSlice({
  initialState,
  name: 'feedbackSlice',
  reducers: {
    setFeedbacks: (state, action: PayloadAction<IFeedback[]>) => {
      state.feedbacks = action.payload;
    },
    toggleIsShowAllFeedbacks: (state) => {
      state.isShowAllFeedbacks = !state.isShowAllFeedbacks;
    },
  },
});


export default feedbackSlice.reducer;

export const selectFeedbacks = (state: RootState) => state.feedbackState.feedbacks;
export const selectIsShowAllFeedbacks = (state: RootState) => state.feedbackState.isShowAllFeedbacks;

export const { setFeedbacks, toggleIsShowAllFeedbacks } = feedbackSlice.actions;