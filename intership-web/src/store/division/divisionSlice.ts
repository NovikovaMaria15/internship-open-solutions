import { createSlice } from '@reduxjs/toolkit';
import { Division } from 'Src/models/type';
import { getDivision, addDivision, deleteDivision, editDivision } from './divisionThunk';

const initialState: { data: Division[] } = {
  data: [],
};

const divisionSlice = createSlice({
  name: 'division',
  initialState,
  reducers: {},
  extraReducers: {
    [getDivision.fulfilled.toString()]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload.response;
    },
    [addDivision.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        state.data.push(<Division>action.payload.response.division);
      }
    },
    [deleteDivision.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        const index = state.data.findIndex(
          (division: Division) => division.id === action.payload.divisionId,
        );
        if (index !== -1) state.data.splice(index, 1);
      }
    },
    [editDivision.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        const index = state.data.findIndex(
          (division: Division) => division.id === action.payload.divisionId,
        );
        if (index !== -1) {
          // eslint-disable-next-line no-param-reassign
          state.data[index].id_organization = action.payload.organizationId;
          // eslint-disable-next-line no-param-reassign
          state.data[index].name = action.payload.name;
          // eslint-disable-next-line no-param-reassign
          state.data[index].phone = action.payload.phone;
        }
      }
    },
  },
});

export default divisionSlice;
