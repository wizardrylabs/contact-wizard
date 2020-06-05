import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: null,
    email: null,
    phoneNumber: null,
    companyName: null,
    projectDescription: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setProjectDescription: (state, action) => {
      state.projectDescription = action.payload;
    },
  },
});

export const {
  setName, setEmail, setPhoneNumber, setCompanyName, setProjectDescription,
} = formSlice.actions;

export default formSlice.reducer;
