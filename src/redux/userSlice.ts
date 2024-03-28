import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@redux/api/user/user.types';
import { push } from "redux-first-history";
import { RootState } from './configure-store';
import { ITariffItem } from './api/catalog/catalog.types';
interface IUserState {
  user: IUser | null;
  token: string | null;
  tariffList: ITariffItem | null
}

const initialState: IUserState = {
  token: null,
  user: null,
  tariffList: null
};
export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => {
      window.localStorage.removeItem("token");
      return initialState
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setTariffList: (state, action: PayloadAction<ITariffItem[]>) => {
      console.log(action)
      state.tariffList = action.payload[0];
    },
  },
});

export const selectToken = (state: RootState) => state.userState.token;
export const selectUser = (state: RootState) => state.userState.user;
export const selectTariffList = (state: RootState) => state.userState.tariffList;

export default userSlice.reducer;

export const { logout, setUser, setToken, setTariffList } = userSlice.actions;