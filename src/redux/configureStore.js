import { configureStore, combineReducers } from '@reduxjs/toolkit';

import vehicleSlice from './vehicles/vehicles';
import reservationsSlice from './reservations/reservations';
import login_user from './auth/login';

const reducer = combineReducers({
  user: login_user,
  vehicles: vehicleSlice,
  reservations: reservationsSlice,
});
const store = configureStore({ reducer });
export default store;
