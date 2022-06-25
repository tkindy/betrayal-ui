import {
  ActionReducerMapBuilder,
  AsyncThunk,
  AsyncThunkPayloadCreator,
  CaseReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {
  AppDispatch,
  GameUpdatePayload,
  RootState,
} from '../store';

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
  return createAsyncThunk(typePrefix, payloadCreator);
};

const buildAddUpdateCase: <T>() => <S>(
  builder: ActionReducerMapBuilder<S>,
  reducer: CaseReducer<S, { type: 'REDUX_WEBSOCKET::MESSAGE'; payload: T }>
) => void = () => {
  return (builder, reducer) => {
    builder.addCase('REDUX_WEBSOCKET::MESSAGE', reducer);
  };
};

export const addGameUpdateCase = buildAddUpdateCase<GameUpdatePayload>();
