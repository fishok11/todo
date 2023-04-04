import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
