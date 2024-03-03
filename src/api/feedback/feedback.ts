import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFeedback } from './feedback.types'
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
    getAllFeedbacks: builder.query<IFeedback[], null>({
      query() {
        return {
          url: "",
          credentials: "include"
        }
      },
      // transformResponse: (result: { data: IFeedback[] }) =>
      //   result.data || [],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data)
          dispatch(setFeedbacks(data));
        } catch (error) { /* empty */ }
      },
    }),

    addFeedback: builder.mutation({
      query: (body: IFeedback) => ({
        url: "",
        method: 'post',
        body: body,
        invalidatesTags: ['Feedbacks'],
      }),
    }),
  })
})

export const {
  useGetAllFeedbacksQuery,
  useAddFeedbackMutation,
} = feedbackApi 