import { 
  createSlice, 
  // PayloadAction 
} from '@reduxjs/toolkit';
import { 
  RootState, 
} from './store';

//============================================================= STATE
type TodoStateType = {}

const initialState: TodoStateType = {};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {}
})

export const todoState = (state: RootState) => state.todo;

export default todoSlice.reducer;