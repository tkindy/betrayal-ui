import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api/api';
import { Card } from './models';
import { getGameId } from './selectors';
import { createAsyncThunk } from './utils';

export const getDrawnCard = createAsyncThunk(
  'cards/drawn/get',
  async (_, { getState }) => api.getDrawnCard(getGameId(getState()))
);

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

export const discardDrawnCard = createAsyncThunk(
  'cardStacks/drawn/discard',
  async (_, { getState }) => {
    return api.discardDrawnCard(getGameId(getState()));
  }
);

interface CardStacksState {
  drawnCard: Card | null;
}

const initialState: CardStacksState = {
  drawnCard: null,
};

const cardStacksSlice = createSlice({
  name: 'cardStacks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDrawnCard.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      })
      .addCase(drawEvent.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      })
      .addCase(drawItem.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      })
      .addCase(drawOmen.fulfilled, (state, { payload: card }) => {
        state.drawnCard = card;
      })
      .addCase(discardDrawnCard.fulfilled, (state) => {
        state.drawnCard = null;
      });
  },
});

export default cardStacksSlice.reducer;
