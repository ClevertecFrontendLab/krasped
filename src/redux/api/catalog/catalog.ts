import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '@redux/configure-store';
import { ITariffItem, ITrainingItem } from './catalog.types';
import { setTrainingList } from '@redux/trainingSlice';
import { selectTariffList, setTariffList } from '@redux/userSlice';

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

  tagTypes: ['TrainingList', 'TariffList'],
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

    getTariffList: builder.query<ITariffItem, null>({
      query() {
        return {
          url: "/tariff-list",
          credentials: "include"
        }
      },
      providesTags: ['TariffList'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTariffList(data));
        } catch (error) { /* empty */ }
      },
    }),
  })
})

export const {
  useGetTriningListQuery,
  useGetTariffListQuery,
} = catalogApi 