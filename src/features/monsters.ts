import { createSlice } from '@reduxjs/toolkit';
import { Monster } from './models';

interface MonstersState {
  monsters?: Monster[];
}

const initialState: MonstersState = {};

const monstersSlice = createSlice({
  name: 'monsters',
  initialState,
  reducers: {},
});

export default monstersSlice.reducer;
