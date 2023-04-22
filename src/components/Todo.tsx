import { useState, FC } from 'react';
// import { 
//   useAppSelector, 
//   useAppDispatch 
// } from '../store/hooks';
// import {
//   todo,
// } from '../store/todoSlice';
import {
  useGetTasksQuery,
  useAddTaskMutation,
} from '../store/todoAPI'
import {
  TaskDb,
} from '../store/types';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import TaskCard from './TaskCard'
import CircularProgress from '@mui/joy/CircularProgress';
import toast from 'react-hot-toast';

const styles = {
  inputContainer: {
    display: 'flex', 
    gap: 2, 
    marginBottom: '20px' 
  },
  tasksContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 2,
  },
  loading:{
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

const Todo: FC = () => {
  // const state = useAppSelector(todo);
  // const dispatch = useAppDispatch();
  const {data = [], isLoading} = useGetTasksQuery(); 
  const [addTask, {isError}] = useAddTaskMutation();
  const [taskText, setTaskText]  = useState<string>('');
  const [errorInput, setErrorInput] = useState<boolean | undefined>(false);
  const task = {
    text: taskText,
    completed: false,
  };
  const hendleChangeAdd = async() => { 
    if (taskText === '') {
      setErrorInput(true);
    } else {
      await addTask(task).unwrap();
      toast.success('Task added!');
      setTaskText('');
    }
  };

  if (isLoading) {
    return (
      <Box sx={styles.loading}>
        <CircularProgress
          color="info"
          determinate={false}
          size="md"
          value={15}
          variant="plain"
        />
      </Box>
    )
  } 

  if (isError) toast.error('Error!');

  return (
    <>
      <Box sx={styles.inputContainer}>
        <Input
          color={errorInput === true ? "danger" : "info"}
          size="md"
          variant="soft"
          placeholder="Type here…"
          error={errorInput}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          slotProps={{ input: { 'data-testid': 'input-todo' } }}
        />
        <Button
          color="info"
          variant="soft"
          onClick={() => hendleChangeAdd()}
          data-testid='add-button'
        >Add</Button>
      </Box>
      <Box sx={styles.tasksContainer} data-testid='todo-card-container'>
        {data.map((task: TaskDb) => 
          <TaskCard key={task.id} id={task.id} text={task.text} completed={task.completed} data-testid='todo-card'/>
        )}
      </Box>
    </>
  );
}

export default Todo;