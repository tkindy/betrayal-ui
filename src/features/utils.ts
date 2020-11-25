import {
  AsyncThunk,
  AsyncThunkPayloadCreator,
  createAsyncThunk as CAT,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

export const createAsyncThunk: <Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<
    Returned,
    ThunkArg,
    { state: RootState }
  >
) => AsyncThunk<Returned, ThunkArg, { state: RootState }> = (
  typePrefix,
  payloadCreator
) => {
  return CAT(typePrefix, payloadCreator);
};
