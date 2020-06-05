import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../features/form/formSlice';

export default configureStore({
  reducer: {
    form: formReducer,
  },
});
