import { combineReducers } from '@reduxjs/toolkit';
import authorizationSlice from './authorization/authorizationSlice';
import organizationSlice from './organization/organizationSlice';

const rootReducer = combineReducers({
  authorization: authorizationSlice.reducer,
  organization: organizationSlice.reducer,
});

export default rootReducer;
