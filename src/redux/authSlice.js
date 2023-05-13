// import { fetchContacts, addContact, deleteContact } from './operations';
import { register, logIn, logOut } from './operations';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const initialState = {
  user: {name: null, email: null},
  token: null,
  isLoggedIn: false,
};

// const handleRejected = (state, action) => {
//   state.status = 'rejected';
//   state.error = action.payload;
// };

// const handleLoading = state => {
//   state.status = 'loading';
// };

// const handleAdding = state => {
//   state.status = 'adding';
// };

// const handleDeleting = state => {
//   state.status = 'deleting';
// };

// const handleFetchContacts = (state, action) => {
//   state.status = 'fulfilled';
//   state.error = null;
//   state.items = action.payload;
// };

// const handleAddContact = (state, action) => {
//   state.status = 'addedContact';
//   state.error = null;
//   state.items = [action.payload, ...state.items];
// };

// const handleDeleteContact = (state, action) => {
//   state.status = 'deletedContact';
//   state.error = null;
//   const index = state.items.findIndex(
//     contact => contact.id === action.payload.id
//   );
//   state.items.splice(index, 1);
// };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  // reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {
          
        })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(logIn.pending, (state, action) => {
        
      })
      .addCase(logIn.fulfilled, (state, action) => {
        
      })
      .addCase(logOut.pending, (state, action) => {
        
      })
      .addCase(logOut.fulfilled, (state, action) => {
        
      })
      .addMatcher(
        isAnyOf(register.rejected, logIn.rejected, logOut.rejected),
        (state, action) => {
          
        }
      );
  },
});

export const authReducer = authSlice.reducer;
