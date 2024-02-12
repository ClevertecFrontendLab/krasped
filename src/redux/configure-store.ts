import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
    collapsed: false,
};

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
    reducer: {
        app: appSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
