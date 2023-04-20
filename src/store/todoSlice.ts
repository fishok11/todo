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
  addTask,
  deleteTask,
  completedTask,
} from './todoAPI';

//============================================================= TASK TYPES & ASYNC  
export type TodoItem = {
  text: string;
  completed: boolean;
}

export type TodoItemDb = {
  id: number;
  text: string;
  completed: boolean;
}
//--------------------------------------------------------------
export const addTaskAsync = createAsyncThunk(
  'todo/addTask',
  async (task: TodoItem) => {
    addTask(task);
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'todo/addTask',
  async (id: number) => {
    deleteTask(id);
  }
);

export const completedTaskAsync = createAsyncThunk(
  'todo/addTask',
  async (task: TodoItemDb) => {
    completedTask(task);
  }
);  
//============================================================= STATE
export type TodoStateType = {
  changeDb: boolean
}

const initialState: TodoStateType = {
  changeDb: false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateDb: (state) => {
      state.changeDb = !state.changeDb;
    },
  }
})

export const { updateDb } = todoSlice.actions;

export const todo = (state: RootState) => state.todo;

export default todoSlice.reducer;