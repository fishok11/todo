import { useState, FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  addTaskAsync,
  todo,
  TodoItemDb,
  uploadTask,
} from '../store/todoSlice';

import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import TaskCard from './TaskCard'

const Todo: FC = () => {
  const state = useAppSelector(todo);
  const dispatch = useAppDispatch();
  const [task, setTask] = useState('');
  const [tasksDb, setTasksDb] = useState([]);
  const taskDb = {
    text: task,
    completed: false,
  };
  const onClick = () => {
    dispatch(addTaskAsync(taskDb));
    dispatch(uploadTask());
    console.log(state);
  };

  useEffect(() => {
    const getTasks = async() => {
      const res = await fetch('http://localhost:3002/todo')
      const data = await res.json()
      setTasksDb(data);
    };
    getTasks()
    .then(error => console.log(error))
  }, [state.uploadTask]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: '20px' }}>
        <Input
          color="info"
          disabled={false}
          size="md"
          variant="soft"
          placeholder="Type here…"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          color="info"
          variant="soft"
          onClick={() => onClick()}
        >Add</Button>
      </Box>
      <Box sx={{ display: 'flex',flexDirection: 'column', gap: 2 }}>
        {tasksDb.map((task: TodoItemDb) => 
          <TaskCard key={task.id} text={task.text} id={task.id}/>
        )}
      </Box>
    </>
  );
}

export default Todo;