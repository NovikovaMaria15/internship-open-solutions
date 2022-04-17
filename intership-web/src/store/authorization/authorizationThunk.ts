import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type LoginParams = {
  login: string;
  password: string;
};

const authorization = createAsyncThunk(
  'authorization/authorize',
  async ({ login, password }: LoginParams, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/authorize', {
        loginData: {
          login,
          password,
        },
      });
      return response.data.isLogin;
    } catch {
      return rejectWithValue(null);
    }
  },
);

export default authorization;
