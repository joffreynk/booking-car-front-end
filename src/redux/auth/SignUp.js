import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import authenticate from './authenticate';
import URL from '../url';

export const signUpUser = createAsyncThunk('SIGN_UP', async (userinfo) => {
  const response = await fetch(`${URL}users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(userinfo),
  });
  const user = await response.json();
  // if (response.ok) {
  //   localStorage.removeItem('user');
  //   localStorage.setItem('user', JSON.stringify(user));
  // }
  return user;
});

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: [],
  extraReducers: {
    [signUpUser.fulfilled]: (state, action) => action.payload,
  },
});

export default signUpSlice.reducer;
