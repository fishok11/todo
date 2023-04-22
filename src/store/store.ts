import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import { todoApi } from './todoAPI';

export const store = configureStore({
    reducer: {
      todo: todoSlice,
      [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(todoApi.middleware)
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
