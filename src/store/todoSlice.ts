import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { 
  RootState, 
  AppThunk 
} from './store';
import { 
  addTask
} from './todoAPI';


export type TodoItem = {
  text: string;
  completed: boolean;
}
export interface TodoState {
  tasks: Array<TodoItem>;
}
const initialState: TodoState = {
  tasks: [],
};

export const todoSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // addTask: (state, action: PayloadAction<TodoItem>) => {
    //   state.tasks.push(action.payload);
    // },
    // taskDone: (state, action: PayloadAction<TodoItem>) => {

    // },
  }
})
// export const { addTask } = todoSlice.actions;

export const addTaskAsync = createAsyncThunk(
  'counter/fetchCount',
  async (task: TodoItem) => {
    const response = await addTask(task);
    // The value we return becomes the `fulfilled` action payload
    // return response.data;
  }
);

export const selectTask = (state: RootState) => state.todo;

export default todoSlice.reducer;