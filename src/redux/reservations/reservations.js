import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const getUrl = 'https://api.spacexdata.com/v3/reservations';

const FETCHED_RESERVATION = 'FETCHED_RESERVATION';
const ADD_RESERVATION = 'ADD_RESERVATION';
const DELETE_RESERVATION = 'DELETE_RESERVATION';
const DELETE_VEHICLE_RESERVATION = 'DELETE_VEHICLE_RESERVATION';

export const getReservations = createAsyncThunk(
  FETCHED_RESERVATION,
  async () => {
    const reservationArr = [];
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch('http://localhost:3000/api/v1/reservations', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: user.token,
      },
    });
    const initValues = await response.json();
    initValues.forEach((reservation) => {
      reservationArr.push({
        id: reservation.id,
        user_id: reservation.user_id,
        vehicle_id: reservation.vehicle_id,
        city: reservation.city,
        reservation_date: reservation.reservation_date,
        return_date: reservation.return_date,
        status: reservation.status,
      });
    });
    return (reservationArr);
  },
);

export const addReservation = createAsyncThunk(
  ADD_RESERVATION,
  async (reservationInfo) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch('http://localhost:3000/api/v1/reservations', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: user.token,
      },
      body: JSON.stringify(reservationInfo),
    });
    const reservation = await response.json();
    return reservation;
  },
);

export const deleteReservation = createAsyncThunk(
  DELETE_RESERVATION,
  async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch(`http://localhost:3000/api/v1/reservations/${id}`, {
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

export const deleteVehicleReservations = (vehicle_id) => ({
  type: DELETE_VEHICLE_RESERVATION,
  payload: vehicle_id,
});

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: [],
  extraReducers: {
    [getReservations.fulfilled]: (state, action) => action.payload,
    [addReservation.fulfilled]: (state, action) => ([...state, action.payload]),
    [deleteReservation.fulfilled]: (state, action) => (state.filter((elem) => elem.id !== action.payload)), /* eslint-disable-line */
    [DELETE_VEHICLE_RESERVATION]: (state, action) => (state.filter((elem) => elem.vehicle_id !== action.payload)), /* eslint-disable-line */
  },
});

export default reservationSlice.reducer;
