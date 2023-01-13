import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import URL from '../url';

export const login = createAsyncThunk('LOGIN', async (userinfo) => {
  const response = await fetch(`${URL}auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(userinfo),
  });
  const user = await response.json();
  if (response.ok) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }
  return user;
});

const loginSlice = createSlice({
  name: 'user',
  initialState: [],
  extraReducers: {
    [login.fulfilled]: (state, action) => action.payload,
  },
});

export default loginSlice.reducer;
