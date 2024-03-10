import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '@redux/configure-store';
import { ITraining, ITrainingReq } from './training.types';
import { setTrainings } from '@redux/trainingSlice';

export const trainingApi = createApi({
  reducerPath: 'calendar',
  keepUnusedDataFor: 60,
  baseQuery: retry(fetchBaseQuery({
    baseUrl: "https://marathon-api.clevertec.ru/training",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), { maxRetries: 2 }),

  tagTypes: ['Trainings'],
  endpoints: (builder) => ({

    getAllTrinings: builder.query<ITraining[], null>({
      query() {
        return {
          url: "",
          credentials: "include"
        }
      },
      providesTags: ['Trainings'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTrainings(data));
        } catch (error) { /* empty */ }
      },
    }),

    getAllTriningsMut: builder.mutation<ITraining[], null>({
      query() {
        return {
          url: "",
          method: 'get',
          credentials: "include"
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTrainings(data));
        } catch (error) { /* empty */ }
      },
    }),

    addTraining: builder.mutation({
      query: (body: ITrainingReq) => ({
        url: "",
        method: 'post',
        body: body,
      }),
      invalidatesTags: ['Trainings'],
    }),

    deleteTraining: builder.mutation({
      query: (body: ITrainingReq) => ({
        url: "",
        method: 'delete',
        body: body,
      }),
      invalidatesTags: ['Trainings'],
    }),

    updateTraining: builder.mutation({
      query: (body: ITrainingReq) => ({
        url: "",
        method: 'put',
        body: body,
      }),
      invalidatesTags: ['Trainings'],
    }),
  })
})

export const {
  useGetAllTriningsQuery,
  useGetAllTriningsMutMutation,
  useAddTrainingMutation,
  useDeleteTrainingMutation,
  useUpdateTrainingMutation,
} = trainingApi 