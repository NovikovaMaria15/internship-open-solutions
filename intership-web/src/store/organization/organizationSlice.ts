import { createSlice } from '@reduxjs/toolkit';
import getOrganizations from './organizationThunk';

const initialState = {
  data: {},
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: {
    [getOrganizations.fulfilled.toString()]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
      console.log('action', action);
    },
    [getOrganizations.rejected.toString()]: (state, action) => {
      console.log('state', state);
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
    },
  },
});

export default organizationSlice;
