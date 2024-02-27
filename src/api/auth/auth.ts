import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChangePassword, ICheckEmail, IConfirmEmail, IRegistration, Ilogin } from './auth.types'
import { userApi } from '@api/user/user';
import { setToken } from '@redux/userSlice';
import { FieldType } from '@components/login-form/login-form';

// const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;
const BASE_URL = "https://marathon-api.clevertec.ru";

export const authApi = createApi({
  reducerPath: 'auth',
  keepUnusedDataFor: 60,
  // baseQuery: retry(fetchBaseQuery({ baseUrl: "https://marathon-api.clevertec.ru/auth/" }), { maxRetries: 5 }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    // prepareHeaders: (headers, { getState }) => {
    //   const cookieValue = 'значение_из_куки'; // Получаем значение из cookie
    //   if (cookieValue) {
    //     headers.set('Cookie-Header', cookieValue); // Устанавливаем заголовок с нужным значением из cookie
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({

    getGoogle: builder.query({
      query: () => `google?format=json`
    }),

    login: builder.mutation({
      query: (props: FieldType) => {
        const { isRememberMe, ...body } = props;
        return {
          url: "login",
          method: 'POST',
          body: body,
          credentials: 'include',
        }
      },
      async onQueryStarted({ isRememberMe }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          if (isRememberMe) {
            window.localStorage.setItem("token", data.accessToken)
          }
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) { /* empty */ }
      },
    }),
    registration: builder.mutation({
      query: (user: IRegistration) => ({
        url: "registration",
        method: 'POST',
        body: user,
      }),
    }),
    checkEmail: builder.mutation({
      query: (user: ICheckEmail) => ({
        url: "check-email",
        method: 'POST',
        body: user,
        credentials: 'include'
      }),
    }),
    confirmEmail: builder.mutation({
      query: (code: IConfirmEmail) => ({
        url: "confirm-email",
        method: 'POST',
        body: code,
        credentials: 'include',
      }),
    }),
    changePassword: builder.mutation({
      query: (user: IChangePassword) => ({
        url: "change-password",
        method: 'POST',
        body: user,
        credentials: 'include',
      }),
    }),

    // getPosts: builder.query({
    //   query: (arg) => `posts/${arg}`,
    //   tagTypes: ['User'],
    //   providesTags: (result) =>
    //     result
    //       ? [
    //         ...result.map(({ id }) => ({ type: 'Posts', id })),
    //         { type: 'Posts', id: 'LIST' },
    //       ]
    //       : [{ type: 'Posts', id: 'LIST' }],
    // }),

    // updateUser: builder.mutation({
    //   query: ({ id, ...body }) => ({
    //     url: id,
    //     method: 'PATCH',
    //     body,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    // })

  })
})

export const {
  useGetGoogleQuery,
  useLoginMutation,
  useRegistrationMutation,
  useCheckEmailMutation,
  useConfirmEmailMutation,
  useChangePasswordMutation
} = authApi 