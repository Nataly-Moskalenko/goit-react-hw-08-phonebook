import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const response = await axios.post('/users/signup', credentials);
    token.set(response.data.token);
    return response.data;
  } catch (e) {
    // return thunkAPI.rejectWithValue(e.message);
  }
});

export const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const response = await axios.post('/users/login', credentials);
    token.set(response.data.token);
    return response.data;
  } catch (e) {
    // return thunkAPI.rejectWithValue(e.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (e) {
    // return thunkAPI.rejectWithValue(e.message);
  }
});

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (e) {
    // return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async newContact => {
    try {
      const response = await axios.post('/contacts', newContact);
      return response.data;
    } catch (e) {
      // return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      // return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrent',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e) {
      // return thunkAPI.rejectWithValue(e.message);
    }
  }
);
