import { authApi } from '@api/auth/auth';
import { userApi } from '@api/user/user';
import { feedbackApi } from '@api/feedback/feedback';
import { PayloadAction, combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import userReducer from '@redux/userSlice';
import feedbackReducer from '@redux/feedbackSlice';
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

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
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
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        userState: userReducer,
        feedbackState: feedbackReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        routerMiddleware,
        authApi.middleware,
        userApi.middleware,
        feedbackApi.middleware
    ),
});

export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;