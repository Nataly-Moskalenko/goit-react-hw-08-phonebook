import { register, logIn, logOut } from './operations';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  // reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(register.pending, (state, action) => {})
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // .addCase(logIn.pending, (state, action) => {})
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // .addCase(logOut.pending, (state, action) => {})
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
    // .addMatcher(
    //   isAnyOf(register.rejected, logIn.rejected, logOut.rejected),
    //   (state, action) => {}
    // );
  },
});

export const authReducer = authSlice.reducer;
