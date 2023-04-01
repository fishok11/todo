import { 
  createAsyncThunk, 
  createSlice, 
  // PayloadAction 
} from '@reduxjs/toolkit';
import { 
  RootState, 
  // AppThunk 
} from './store';
import { 
  addTask
} from './todoAPI';


export type TodoItemDb = {
  id: number;
  text: string;
  completed: boolean;
}
export type TodoItem = {
  text: string;
  completed: boolean;
}
export type TodoStateType = {
  tasks: Array<TodoItem>;
  uploadTask: boolean;
}
const initialState: TodoStateType = {
  tasks: [],
  uploadTask: false,
};

export const addTaskAsync = createAsyncThunk(
  'todo/addTask',
  async (task: TodoItem) => {
    addTask(task);
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    uploadTask: (state) => {
      state.uploadTask = !state.uploadTask
    },
  }
})

export const { uploadTask } = todoSlice.actions;

export const todo = (state: RootState) => state.todo;

export default todoSlice.reducer;