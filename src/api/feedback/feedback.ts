import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFeedback, IFeedbackReq } from './feedback.types'
import { RootState } from '@redux/configure-store';
import { setFeedbacks } from '@redux/feedbackSlice';

export const feedbackApi = createApi({
  reducerPath: 'feedback',
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://marathon-api.clevertec.ru/feedback",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Feedbacks'],
  endpoints: (builder) => ({
    getAllFeedbacks: builder.mutation<IFeedback[], null>({
      query() {
        return {
          url: "",
          method: 'get',
          credentials: "include"
        }
      },
      invalidatesTags: ['Feedbacks'],
      transformResponse: (result: IFeedback[]) =>
        result?.reverse() || [],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data)
          dispatch(setFeedbacks(data));
        } catch (error) { /* empty */ }
      },
    }),

    addFeedback: builder.mutation({
      query: (body: IFeedbackReq) => ({
        url: "",
        method: 'post',
        body: body,
      }),
      invalidatesTags: ['Feedbacks'],
    }),
  })
})

export const {
  useGetAllFeedbacksMutation,
  useAddFeedbackMutation,
} = feedbackApi 