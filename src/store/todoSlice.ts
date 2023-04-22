import { 
  createSlice, 
  // PayloadAction 
} from '@reduxjs/toolkit';
import { 
  RootState, 
} from './store';

//============================================================= STATE
export type TodoStateType = {}

const initialState: TodoStateType = {};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {}
})

export const todo = (state: RootState) => state.todo;

export default todoSlice.reducer;