import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  number: '',
  id: '',
};

const updateSlice = createSlice({
  name: 'update',
  initialState: initialState,
  reducers: {
    update(state, action) {
      return (state = action.payload);
    },
  },
});

export const { update } = updateSlice.actions;
export const updateReducer = updateSlice.reducer;
