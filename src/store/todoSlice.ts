import { 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { 
  RootState, 
} from './store';

//============================================================= STATE
type TodoStateType = {
  id: string;
  text: string;
  completed: boolean;
  edit: boolean;
}

const initialState: TodoStateType = {
  id: '',
  text: '',
  completed: false,
  edit: false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    editTaskText: (state, action: PayloadAction<{id: string, text: string, completed: boolean}>) => {
      state.id = action.payload.id;
      state.text = action.payload.text;
      state.completed = action.payload.completed;
      state.edit = !state.edit;
    },
    removeState: (state) => {
      state.id = initialState.id;
      state.text = initialState.text;
      state.completed = initialState.completed;
      state.edit = initialState.edit;
    },
  }
})
export const { editTaskText, removeState } = todoSlice.actions

export const todoState = (state: RootState) => state.todo;

export default todoSlice.reducer;