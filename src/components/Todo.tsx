import { 
  useState, 
  FC, 
  useEffect 
} from 'react';
import { 
  useAppSelector, 
  useAppDispatch 
} from '../store/hooks';
import {
  todoState,
  removeState,
} from '../store/todoSlice';
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
} from '../store/todoAPI'
import {
  TaskDb,
} from '../store/types';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import TaskCard from './TaskCard'
import CircularProgress from '@mui/joy/CircularProgress';
import toast from 'react-hot-toast';

const styles = {
  gContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    gap: 2,
  },
  inputContainer: {
    display: 'flex', 
    gap: 2, 
    width: '100%'
  },
  tasksContainer: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 2,
    width: '100%'
  },
  loading:{
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
}

const Todo: FC = () => {
  const state = useAppSelector(todoState);
  const dispatch = useAppDispatch();
  const {data = [], isLoading, isSuccess, error} = useGetTasksQuery(); 
  const [addTask, {isError}] = useAddTaskMutation();
  const [editTaskDb] = useEditTaskMutation()
  const [taskText, setTaskText]  = useState<string>('');
  const [errorInput, setErrorInput] = useState<boolean | undefined>(false);
  const task = {
    text: taskText,
    completed: false,
  };
  const taskEdit = {
    id: state.id,
    text: taskText,
    completed: state.completed,
  };
  const hendleChangeAdd = async() => { 
    if (taskText === '') {
      setErrorInput(true);
    } else if (state.id !== '') {
      await editTaskDb(taskEdit).unwrap()
      toast.success('Task has been edited!');
      setErrorInput(false);
      setTaskText('');
      dispatch(removeState())
    } else {
      await addTask(task).unwrap();
      toast.success('Task added!');
      setErrorInput(false);
      setTaskText('');
    };
  };

  useEffect(() => {
    setTaskText(state.text);
  }, [state.edit, state.text])

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
  if (isError || error) {
    toast.error('Error!');
  }
  return (
    <Box sx={styles.gContainer}>
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
        >{state.id !== null ? 'Save' : 'Add'}</Button>
      </Box>
      {isSuccess && (<Box sx={styles.tasksContainer} data-testid='task-card-container'>
        {data.map((task: TaskDb) => 
          <TaskCard key={task.id} id={task.id} text={task.text} completed={task.completed} data-testid='task-card'/>
        )}
      </Box>)}
    </Box>
  );
}

export default Todo;