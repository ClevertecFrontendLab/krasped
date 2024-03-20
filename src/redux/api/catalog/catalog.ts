import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '@redux/configure-store';
import { ITrainingItem } from './catalog.types';
import { setTrainingList } from '@redux/trainingSlice';

export const catalogApi = createApi({
  reducerPath: 'catalog',
  keepUnusedDataFor: 60,
  baseQuery: retry(fetchBaseQuery({
    baseUrl: "https://marathon-api.clevertec.ru/catalogs",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), { maxRetries: 2 }),

  tagTypes: ['TrainingList'],
  endpoints: (builder) => ({

    getTriningList: builder.query<ITrainingItem[], null>({
      query() {
        return {
          url: "/training-list",
          credentials: "include"
        }
      },
      providesTags: ['TrainingList'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTrainingList(data));
        } catch (error) { /* empty */ }
      },
    }),
  })
})

export const {
  useGetTriningListQuery,
} = catalogApi 