import {
  ActionReducerMapBuilder,
  AsyncThunk,
  AsyncThunkPayloadCreator,
  CaseReducer,
  createAsyncThunk as CAT,
} from '@reduxjs/toolkit';
import { AppDispatch, GameUpdatePayload, RootState } from '../store';

export const createAppAsyncThunk: <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg,
    { dispatch: AppDispatch; state: RootState }
  >
) => AsyncThunk<Returned, ThunkArg, { state: RootState }> = (
  typePrefix,
  payloadCreator
) => {
  return CAT(typePrefix, payloadCreator);
};

export const addUpdateCase: <S>(
  builder: ActionReducerMapBuilder<S>,
  reducer: CaseReducer<
    S,
    { type: 'REDUX_WEBSOCKET::MESSAGE'; payload: GameUpdatePayload }
  >
) => void = (builder, reducer) => {
  builder.addCase('REDUX_WEBSOCKET::MESSAGE', reducer);
};
