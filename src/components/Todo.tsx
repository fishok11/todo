import { useState, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  // addTask,
  addTaskAsync,
  selectTask,
  TodoItem,
} from '../store/todoSlice';

import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import TaskCard from './TaskCard'

const Todo: FC = () => {
  const state = useAppSelector(selectTask);
  const dispatch = useAppDispatch();
  const [task, setTask] = useState('')
  const tasks = state.tasks;
  const taskDb = {
    text: task,
    completed: false,
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: '20px' }}>
        <Input
          color="info"
          disabled={false}
          size="md"
          variant="soft"
          placeholder="Вводите здесь…"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          color="info"
          variant="soft"
          onClick={() => dispatch(addTaskAsync(taskDb))}
        >Добавить</Button>
      </Box>
      <Box sx={{ display: 'flex',flexDirection: 'column', gap: 2 }}>
        {tasks.map((task: TodoItem) => 
          <TaskCard key={task.text} text={task.text}/>
        )}
      </Box>
    </>
  );
}

export default Todo;