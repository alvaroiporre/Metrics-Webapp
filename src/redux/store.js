import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './country/countrySlice';

export default configureStore({
  reducer: {
    countries: countryReducer,
  },
});
