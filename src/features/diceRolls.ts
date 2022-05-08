import { createSlice } from '@reduxjs/toolkit';
import { addUpdateCase, createAppAsyncThunk } from './utils';
import * as api from '../api/api';
import { getGameId } from './selectors';
import { DiceRoll, DiceRollType } from './models';

interface RollDicePayload {
  numDice: number;
  type: DiceRollType;
}

export const rollDice = createAppAsyncThunk(
  'rollDice',
  async (payload: RollDicePayload, { getState }) => {
    return api.rollDice(getGameId(getState()), payload.numDice, payload.type);
  }
);

interface DiceRollsState {
  roll?: DiceRoll;
}

const initialState: DiceRollsState = {};

const diceRollsSlice = createSlice({
  name: 'diceRolls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rollDice.fulfilled, (state, { payload: roll }) => {
      state.roll = roll;
    });

    addUpdateCase(builder, (state, { payload: { message } }) => {
      state.roll = message.latestRoll || undefined;
    });
  },
});

export default diceRollsSlice.reducer;
