import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChangePassword, ICheckEmail, IConfirmEmail, IRegistration, Ilogin } from './auth.types'
import { userApi } from '@redux/api/user/user';
import { setToken } from '@redux/userSlice';
import { FieldType } from '@components/login-form/login-form';

const BASE_URL = "https://marathon-api.clevertec.ru";

export const authApi = createApi({
  reducerPath: 'auth',
  keepUnusedDataFor: 60,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,

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
          // await dispatch(userApi.endpoints.getMe.initiate(null));
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