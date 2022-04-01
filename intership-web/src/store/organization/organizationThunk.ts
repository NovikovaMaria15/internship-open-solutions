import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getOrganizations = createAsyncThunk('organization/getOrganizations', async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8080/organization`);
    return response.data;
  } catch {
    return null;
  }
});

export default getOrganizations;
