import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../url';

const GET_VEHICLE = 'GET_VEHICLE';
const ADD_VEHICLE = 'ADD_VEHICLE';
const DELETE_VEHICLE = 'DELETE_VEHICLE';

export const getVehicles = createAsyncThunk(
  GET_VEHICLE,
  async () => {
    const vehicleList = [];
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${URL}vehicles`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: user.token,
      },
    });
    const initValues = await response.json();
    initValues.forEach((elem) => {
      vehicleList.push({
        id: elem.id,
        name: elem.name,
        model: elem.model,
        description: elem.description,
        pict: elem.pict,
        image: elem.picture_url,
        price_per_day: elem.price_per_day,
        color: elem.color,
      });
    });
    return (vehicleList);
  },
);

export const addVehicle = createAsyncThunk(
  ADD_VEHICLE,
  async (vehicleInfo) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch('http://localhost:3000/api/v1/vehicles', {
      method: 'POST',
      headers: {
        Authorization: user.token,
      },
      body: vehicleInfo,
    });
    const vehicle = await response.json();
    return vehicle;
  },
);

export const deleteVehicle = createAsyncThunk(
  DELETE_VEHICLE,
  async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch(`http://localhost:3000/api/v1/vehicles/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: user.token,
      },
    });
    return id;
  },
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: [],
  extraReducers: {
    [getVehicles.fulfilled]: (state, action) => action.payload,
    [addVehicle.fulfilled]: (state, action) => ([...state, action.payload]),
    [deleteVehicle.fulfilled]: (state, action) => (state.filter((elem) => elem.id !== action.payload)), /* eslint-disable-line */
  },
});
export default vehicleSlice.reducer;
