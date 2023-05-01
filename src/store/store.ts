import { 
  configureStore, 
  ThunkAction, 
  Action, 
  combineReducers, 
  PreloadedState  
} from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import { todoApi } from './todoAPI';
import { setupListeners } from '@reduxjs/toolkit/query'

// export const setupStore  = configureStore({
//     reducer: {
//       todo: todoSlice,
//       [todoApi.reducerPath]: todoApi.reducer,
//     },
//     middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(todoApi.middleware)
// });

const rootReducer = combineReducers({
  todo: todoSlice,
  [todoApi.reducerPath]: todoApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware),
})

const store = setupStore()

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
