import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDivision = createAsyncThunk(
  'division/getDivision',
  async ({ organizationId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/division/?id=${organizationId}`);
      return { organizationId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const addDivision = createAsyncThunk(
  'division/addDivision',
  // eslint-disable-next-line camelcase
  async ({ id_organization, name, phone, divisionId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8080/division/?id=${divisionId}`, {
        // eslint-disable-next-line camelcase
        id_organization,
        name,
        phone,
      });
      return { divisionId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const deleteDivision = createAsyncThunk(
  'division/deleteDivision',
  async ({ divisionId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/division/?id=${divisionId}`);
      return { divisionId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const editDivision = createAsyncThunk(
  'diviion/editDivision',
  // eslint-disable-next-line camelcase
  async ({ name, id_organization, phone, divisionId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/division/?id=${divisionId}`, {
        // eslint-disable-next-line camelcase
        id_organization,
        name,
        phone,
      });
      // eslint-disable-next-line camelcase
      return { divisionId, id_organization, name, phone, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);
