import { createSlice } from '@reduxjs/toolkit';
import { Organization } from 'src/models/organzation';
import {
  getOrganizations,
  addOrganizations,
  deleteOrganization,
  editOrganizations,
} from './organizationThunk';

const initialState: { data: Organization[] } = {
  data: [],
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: {
    [getOrganizations.fulfilled.toString()]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload;
    },

    [addOrganizations.fulfilled.toString()]: (state, action) => {
      if (action.payload.success) {
        state.data.push(<Organization>action.payload.organization);
      }
    },

    [deleteOrganization.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        const index = state.data.findIndex(
          (organization: any) => organization.id === action.payload.organizationId,
        );
        if (index !== -1) state.data.splice(index, 1);
      }
    },

    [editOrganizations.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        const index = state.data.findIndex(
          (organization: any) => organization.id === action.payload.organizationId,
        );
        if (index !== -1) {
          // eslint-disable-next-line no-param-reassign
          state.data[index].name = action.payload.name;
          // eslint-disable-next-line no-param-reassign
          state.data[index].address = action.payload.address;
          // eslint-disable-next-line no-param-reassign
          state.data[index].INN = action.payload.INN;
        }
      }
    },
  },
});

export default organizationSlice;
