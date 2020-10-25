import { createSlice } from '@reduxjs/toolkit';

interface BoardState {}

const initialState: BoardState = {};

const boardSlice = createSlice({ name: 'board', initialState, reducers: {} });

export const {} = boardSlice.actions;
export default boardSlice.reducer;
