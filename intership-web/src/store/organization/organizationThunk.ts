import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type OrganizationParams = {
  name: string;
  address: string;
  INN: number;
};

export const getOrganization = createAsyncThunk('organization/getOrganizations', async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/organization`);
    return response.data;
  } catch {
    return null;
  }
});

export const addOrganization = createAsyncThunk(
  'organization/addOrganizations',
  async ({ name, address, INN }: OrganizationParams, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8080/organization`, {
        name,
        address,
        INN,
      });
      return response.data;
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const deleteOrganization = createAsyncThunk(
  'organization/seleteOrganization',
  async ({ organizationId }: { organizationId: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/organization/?id=${organizationId}`,
      );
      return { organizationId, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);

export const editOrganizations = createAsyncThunk(
  'organization/editOrganizations',
  async (
    { name, address, INN, organizationId }: OrganizationParams & { organizationId?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/organization/?id=${organizationId}`, {
        name,
        address,
        INN,
      });
      return { organizationId, name, address, INN, response: response.data };
    } catch {
      return rejectWithValue(null);
    }
  },
);
