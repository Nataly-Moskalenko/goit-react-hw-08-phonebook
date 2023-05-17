import { register, logIn, logOut, fetchCurrentUser } from './operations';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null,
  status: 'idle',
  error: null,
};

const handleRegisterFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.error = null;
  state.status = 'isLoggedIn';
};

const handleRegisterRejected = (state, action) => {
  state.error = action.payload;
  state.status = 'registerRejected';
};

const handleLogInFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.error = null;
  state.status = 'isLoggedIn';
};

const handleLogInRejected = (state, action) => {
  state.error = action.payload;
  state.status = 'loginRejected';
};

const handleLogOutFulfilled = (state, action) => {
  state.user = { name: null, email: null };
  state.token = null;
  state.error = null;
  state.status = 'idle';
};

const handleFetchCurrentUserLoading = (state, action) => {
  state.status = 'isRefreshing';
};

const handleFetchCurrentUserFulfilled = (state, action) => {
  state.user = action.payload;
  state.status = 'isLoggedIn';
  state.error = null;
};

const handleLoading = (state, action) => {
  state.status = 'pending';
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.status = 'rejected';
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, handleRegisterFulfilled)
      .addCase(register.rejected, handleRegisterRejected)
      .addCase(logIn.fulfilled, handleLogInFulfilled)
      .addCase(logIn.rejected, handleLogInRejected)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(fetchCurrentUser.pending, handleFetchCurrentUserLoading)
      .addCase(fetchCurrentUser.fulfilled, handleFetchCurrentUserFulfilled)
      .addMatcher(
        isAnyOf(register.pending, logIn.pending, logOut.pending),
        handleLoading
      )
      .addMatcher(
        isAnyOf(logOut.rejected, fetchCurrentUser.rejected),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
