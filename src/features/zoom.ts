import { createSlice } from '@reduxjs/toolkit';

const zoomStep = 50;

interface ZoomState {
  gridSize: number;
}

const initialState: ZoomState = { gridSize: 200 };

const zoomSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {
    zoomIn(state) {
      state.gridSize += zoomStep;
    },
    zoomOut(state) {
      state.gridSize -= zoomStep;
    },
  },
});

export const { zoomIn, zoomOut } = zoomSlice.actions;
export default zoomSlice.reducer;
