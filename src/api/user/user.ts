import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from './user.types'
import { setUser } from '@redux/userSlice';
import { RootState } from '@redux/configure-store';

export const userApi = createApi({
  reducerPath: 'user',
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://marathon-api.clevertec.ru/user/",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['User'],
  endpoints: (builder) => ({

    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "/me",
          credentials: "include"
        }
      },
      transformResponse: (result: { data: IUser }) =>
        result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) { /* empty */ }
      },
    }),

    updateUser: builder.mutation({
      query: (body: IUser) => ({
        url: "",
        method: 'put',
        body: body,
      }),
    }),

  })
})

export const {
  useGetMeQuery,
  useUpdateUserMutation,
} = userApi 