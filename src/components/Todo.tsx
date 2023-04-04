import { useState, FC, useEffect } from 'react';
import { 
  useAppSelector, 
  useAppDispatch 
} from '../store/hooks';
import {
  updateDb, 
  addTaskAsync,
  todo,
  TodoItemDb,
} from '../store/todoSlice';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import TaskCard from './TaskCard'

const Todo: FC = () => {
  const state = useAppSelector(todo);
  const dispatch = useAppDispatch();
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [errorInput, setErrorInput] = useState(false);
  const task = {
    text: taskText,
    completed: false,
  };
  const hendleChangeAdd = () => { 
    if (taskText === '') {
      setErrorInput(true);
    } else {
      dispatch(addTaskAsync(task));
      dispatch(updateDb());
      setTaskText('');
    }
  };

  useEffect(() => {
    const getTasks = async() => {
      const res = await fetch('http://localhost:3002/todo')
      const data = await res.json()
      setTasks(data);
    };
    getTasks()
    .catch(error => console.log(error))
  }, [state.changeDb]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: '20px' }}>
        <Input
          color={errorInput === true ? "danger" : "info"}
          size="md"
          variant="soft"
          placeholder="Type here…"
          error={errorInput}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <Button
          color="info"
          variant="soft"
          onClick={() => hendleChangeAdd()}
        >Add</Button>
      </Box>
      <Box sx={{ display: 'flex',flexDirection: 'column', gap: 2 }}>
        {tasks.map((task: TodoItemDb) => 
          <TaskCard key={task.id} id={task.id} text={task.text} completed={task.completed}/>
        )}
      </Box>
    </>
  );
}

export default Todo;