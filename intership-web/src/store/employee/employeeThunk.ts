import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmpoyee = createAsyncThunk(
  'employee/getEmpoyee',
  async ({ divisionId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/employee/?id=${divisionId}`);
      return { divisionId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  // eslint-disable-next-line camelcase
  async ({ id_division, FIO, address, position, employeeId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8080/employee/?id=${employeeId}`, {
        // eslint-disable-next-line camelcase
        id_division,
        FIO,
        address,
        position,
      });
      return { employeeId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async ({ employeeId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/employee/?id=${employeeId}`);
      return { employeeId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const editEmployee = createAsyncThunk(
  'employee/editEmployee',
  // eslint-disable-next-line camelcase
  async ({ id_division, FIO, address, position, employeeId }: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/employee/?id=${employeeId}`, {
        // eslint-disable-next-line camelcase
        id_division,
        FIO,
        address,
        position,
      });
      // eslint-disable-next-line camelcase
      return { employeeId, id_division, FIO, address, position, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);
