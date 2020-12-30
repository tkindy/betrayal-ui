import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api/api';
import { Card } from './models';
import { getGameId } from './selectors';
import { createAsyncThunk } from './utils';

export const drawEvent = createAsyncThunk(
  'cardStacks/events/get',
  async (_, { getState }) => {
    return api.drawEvent(getGameId(getState()));
  }
);

export const drawItem = createAsyncThunk(
  'cardStacks/items/get',
  async (_, { getState }) => {
    return api.drawItem(getGameId(getState()));
  }
);

export const drawOmen = createAsyncThunk(
  'cardStacks/omens/get',
  async (_, { getState }) => {
    return api.drawOmen(getGameId(getState()));
  }
);

interface CardStacksState {
  drawnCard?: Card;
}

const initialState: CardStacksState = {};

const cardStacksSlice = createSlice({
  name: 'cardStacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(drawEvent.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      })
      .addCase(drawItem.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      })
      .addCase(drawOmen.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      });
  },
});

export default cardStacksSlice.reducer;
