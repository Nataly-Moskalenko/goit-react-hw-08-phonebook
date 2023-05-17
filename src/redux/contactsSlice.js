import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from './operations';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

const contactsInitialState = {
  items: [],
  status: 'idle',
  error: null,
};

const handleRejected = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const handleLoading = state => {
  state.status = 'loading';
};

const handleAdding = state => {
  state.status = 'adding';
};

const handleDeleting = state => {
  state.status = 'deleting';
};

const handleUpdating = state => {
  state.status = 'updating';
};

const handleFetchContacts = (state, action) => {
  state.status = 'fulfilled';
  state.error = null;
  state.items = action.payload;
};

const handleAddContact = (state, action) => {
  state.status = 'addedContact';
  state.error = null;
  state.items = [action.payload, ...state.items];
};

const handleDeleteContact = (state, action) => {
  state.status = 'deletedContact';
  state.error = null;
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};

const handleUpdateContact = (state, action) => {
  state.status = 'updatedContact';
  state.error = null;  
  state.items.filter(contact => contact.id !== action.payload.id).push(action.payload);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,  
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handleLoading)
      .addCase(fetchContacts.fulfilled, handleFetchContacts)
      .addCase(addContact.pending, handleAdding)
      .addCase(addContact.fulfilled, handleAddContact)
      .addCase(deleteContact.pending, handleDeleting)
      .addCase(deleteContact.fulfilled, handleDeleteContact)
      .addCase(updateContact.pending, handleUpdating)
      .addCase(updateContact.fulfilled, handleUpdateContact)
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          updateContact.rejected
        ),
        handleRejected
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
