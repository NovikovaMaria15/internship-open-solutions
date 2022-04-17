import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type CreateDivisionParams = {
  organizationId?: string;
  name: string;
  phone: number;
};

type EditDivisionParams = {
  organizationId?: string;
  name: string;
  phone: number;
  divisionId: number;
};

export const getDivision = createAsyncThunk(
  'division/getDivision',
  async ({ organizationId }: { organizationId?: string }, { rejectWithValue }) => {
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
  async ({ organizationId, name, phone }: CreateDivisionParams, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/division', {
        id_organization: organizationId,
        name,
        phone,
      });
      return { response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const deleteDivision = createAsyncThunk(
  'division/deleteDivision',
  async ({ divisionId }: { divisionId: number }, { rejectWithValue }) => {
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
  async ({ name, organizationId, phone, divisionId }: EditDivisionParams, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/division/?id=${divisionId}`, {
        id_organization: organizationId,
        name,
        phone,
      });
      return { divisionId, organizationId, name, phone, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);
