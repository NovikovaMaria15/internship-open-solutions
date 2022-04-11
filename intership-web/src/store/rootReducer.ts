import { combineReducers } from '@reduxjs/toolkit';
import authorizationSlice from './authorization/authorizationSlice';
import organizationSlice from './organization/organizationSlice';
import divisionSlice from './division/divisionSlice';
import employeeSlice from './employee/employeeSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice.reducer,
  organization: organizationSlice.reducer,
  division: divisionSlice.reducer,
  employee: employeeSlice.reducer,
});

export default rootReducer;
