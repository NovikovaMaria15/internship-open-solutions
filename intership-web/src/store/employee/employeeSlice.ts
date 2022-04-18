import { createSlice } from '@reduxjs/toolkit';
import { Employee } from 'Src/models/type';
import { getEmpoyee, addEmployee, deleteEmployee, editEmployee } from './employeeThunk';

const initialState: { data: Employee[] } = {
  data: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: {
    [getEmpoyee.fulfilled.toString()]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload.response;
    },
    [addEmployee.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        state.data.push(<Employee>action.payload.response.employee);
      }
    },
    [deleteEmployee.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        const index = state.data.findIndex(
          (employee: Employee) => employee.id === action.payload.employeeId,
        );
        if (index !== -1) state.data.splice(index, 1);
      }
    },
    [editEmployee.fulfilled.toString()]: (state, action) => {
      if (action.payload.response.success) {
        const index = state.data.findIndex(
          (employee: Employee) => employee.id === action.payload.employeeId,
        );
        if (index !== -1) {
          // eslint-disable-next-line no-param-reassign
          state.data[index].FIO = action.payload.FIO;
          // eslint-disable-next-line no-param-reassign
          state.data[index].address = action.payload.address;
          // eslint-disable-next-line no-param-reassign
          state.data[index].position = action.payload.position;
        }
      }
    },
  },
});

export default employeeSlice;
