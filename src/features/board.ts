import { createAction, createSlice } from '@reduxjs/toolkit';
import { GridLoc } from '../components/board/grid';

export const openSpotClicked = createAction<GridLoc>('board/openSpotClicked');

interface BoardState {}

const initialState: BoardState = {};

const boardSlice = createSlice({ name: 'board', initialState, reducers: {} });

export const {} = boardSlice.actions;
export default boardSlice.reducer;
