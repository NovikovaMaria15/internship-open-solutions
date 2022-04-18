import { createSlice } from '@reduxjs/toolkit';
import authorize from './authorizationThunk';

const loggedIn = localStorage.getItem('isLoggedIn');

const initialState = {
  isLogin: loggedIn && JSON.parse(loggedIn),
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isLogin = false;
      localStorage.removeItem('isLoggedIn');
    },
  },
  extraReducers: {
    [authorize.fulfilled.toString()]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isLogin = action.payload;
      localStorage.setItem('isLoggedIn', JSON.stringify(state.isLogin));
    },
    [authorize.rejected.toString()]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isLogin = false;
    },
  },
});

export const { logout } = authorizationSlice.actions;

export default authorizationSlice;
