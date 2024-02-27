import { authApi } from '@api/auth/auth';
import { userApi } from '@api/user/user';
import { PayloadAction, combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import userReducer from '@redux/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
const initialState = {
    collapsed: false,
};

export interface ILocationState {
    from: string;
    formState: {
        email: string;
        password: string;
        confirm: string;
        confirmPassword: string;
    };
}

// const apiErrorMiddleware: Middleware = (baseQueryApi: BaseQueryFn) => async (args, api, extra) => {
//     try {
//         return await baseQueryApi(args, api, extra);
//     } catch (error: any) {
//         if (error.status === 401) {
//             // const { data } = await api.endpoints.refreshAccessToken.mutation();
//             // api.dispatch(setToken(data.token)); // Обновляем токен в хранилище
//             return baseQueryApi(args, api, extra); // Повторяем запрос
//         }
//         throw error;
//     }
// };

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    //other options if needed 
});

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
        },
    },
});

export const { setCollapsed } = appSlice.actions;

export const store = configureStore({
    reducer: combineReducers({
        app: appSlice.reducer,
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        userState: userReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware, authApi.middleware, userApi.middleware),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;