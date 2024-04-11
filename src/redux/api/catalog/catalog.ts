import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { RootState } from '@redux/configure-store';
import { ITariffItem, ITrainingItem } from './catalog.types';
import { setTrainingList, setTrainingPals, setUsersJoing } from '@redux/trainingSlice';
import { selectTariffList, setTariffList } from '@redux/userSlice';
import { IItem } from '@pages/training-page/content/togetrhe-trainings-tab/training-card/training-card';

export const catalogApi = createApi({
  reducerPath: 'catalog',
  keepUnusedDataFor: 60,
  baseQuery: retry(fetchBaseQuery({
    baseUrl: "https://marathon-api.clevertec.ru/catalogs",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), { maxRetries: 2 }),

  tagTypes: ['TrainingList','TrainingPals', 'TariffList', 'UsersJoing'],
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

    getUsersJoint: builder.query<IItem[], null>({
      query() {
        return {
          url: "/user-joint-training-list",
          credentials: "include"
        }
      },
      providesTags: ['UsersJoing'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsersJoing(data));
        } catch (error) { /* empty */ }
      },
    }),
    
    getTrainingPals: builder.query<IItem[], null>({
      query() {
        return {
          url: "/training-pals",
          credentials: "include"
        }
      },
      providesTags: ['TrainingPals'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTrainingPals(data));
        } catch (error) { /* empty */ }
      },
    }),

    getTariffList: builder.query<ITariffItem[], null>({
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
  useGetUsersJointQuery,
  useGetTrainingPalsQuery,
} = catalogApi 