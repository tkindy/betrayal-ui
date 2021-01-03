import { createSlice } from '@reduxjs/toolkit';
import { addUpdateCase, createAsyncThunk } from './utils';
import * as api from '../api/api';
import { getGameId } from './selectors';

interface RollDicePayload {
  numDice: number;
}

export const getLatestRoll = createAsyncThunk(
  'getLatestRoll',
  async (_, { getState }) => {
    return api.getLatestRoll(getGameId(getState()));
  }
);

export const rollDice = createAsyncThunk(
  'rollDice',
  async (payload: RollDicePayload, { getState }) => {
    return api.rollDice(getGameId(getState()), payload.numDice);
  }
);

interface DiceRollsState {
  roll?: number[];
}

const initialState: DiceRollsState = {};

const diceRollsSlice = createSlice({
  name: 'diceRolls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestRoll.fulfilled, (state, { payload: roll }) => {
        state.roll = roll || undefined;
      })
      .addCase(rollDice.fulfilled, (state, { payload: roll }) => {
        state.roll = roll;
      });

    addUpdateCase(builder, (state, { payload: { message } }) => {
      state.roll = message.latestRoll || undefined;
    });
  },
});

export default diceRollsSlice.reducer;
