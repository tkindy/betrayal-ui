import { createSlice } from '@reduxjs/toolkit';
import * as api from '../api/api';
import { Card, Player } from './models';
import { getGameId } from './selectors';
import { addUpdateCase, createAsyncThunk } from './utils';

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

export const giveDrawnCardToPlayer = createAsyncThunk<
  Player,
  { playerId: number }
>('cardStacks/drawn/giveToPlayer', async ({ playerId }, { getState }) => {
  return api.giveDrawnCardToPlayer(getGameId(getState()), playerId);
});

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
      })
      .addCase(giveDrawnCardToPlayer.fulfilled, (state) => {
        state.drawnCard = null;
      });

    addUpdateCase(builder, (state, { payload: { message } }) => {
      state.drawnCard = message.drawnCard;
    });
  },
});

export default cardStacksSlice.reducer;
