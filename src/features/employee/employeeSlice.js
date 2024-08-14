// src/features/user/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    registerEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    editEmployee: (state, action) => {
        state.employees = state.employees.map(emp => 
          emp.id === action.payload.id ? { ...emp, ...action.payload } : emp
        );
      },
    deleteEmployee:(state,action) =>{
        state.employees = state.employees.filter((emp) =>emp.id !== action.payload)
    }
  },
});

export const { registerEmployee, editEmployee,deleteEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;