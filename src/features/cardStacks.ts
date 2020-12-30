import { createSlice } from '@reduxjs/toolkit';

interface CardStacksState {}

const initialState: CardStacksState = {};

const cardStacksSlice = createSlice({
  name: 'cardStacks',
  initialState,
  reducers: {},
});

export default cardStacksSlice.reducer;
