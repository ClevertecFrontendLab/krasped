import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@api/user/user.types';
import { push } from "redux-first-history";
import { RootState } from './configure-store';
interface IUserState {
  user: IUser | null;
  token: string | null;
}

const initialState: IUserState = {
  token: null,
  user: null,
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
  },
});

export const selectToken = (state: RootState) => state.userState.token;

export default userSlice.reducer;

export const { logout, setUser, setToken } = userSlice.actions;