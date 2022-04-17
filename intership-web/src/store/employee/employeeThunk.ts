import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type CreateDivisionParams = {
  FIO: string;
  address: string;
  position: string;
  divisionId?: string;
};

type EditDivisionParams = {
  employeeId: number;
  FIO: string;
  address: string;
  position: string;
};

export const getEmpoyee = createAsyncThunk(
  'employee/getEmpoyee',
  async ({ divisionId }: { divisionId?: string }, { rejectWithValue }) => {
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
  async ({ FIO, address, position, divisionId }: CreateDivisionParams, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/employee', {
        FIO,
        address,
        position,
        id_division: divisionId,
      });
      return { response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async ({ employeeId }: { employeeId: number }, { rejectWithValue }) => {
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
  async ({ employeeId, FIO, address, position }: EditDivisionParams, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/employee/?id=${employeeId}`, {
        FIO,
        address,
        position,
      });
      return { employeeId, FIO, address, position, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);
