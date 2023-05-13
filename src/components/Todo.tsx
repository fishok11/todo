import { 
  FC, 
  useState, 
  useEffect,
  useMemo, 
} from 'react';
import useCookies from 'react-cookie/cjs/useCookies';
import { v4 as uuidv4 } from 'uuid';
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
    width: '350px',
  },
  inputContainer: {
    display: 'flex', 
    gap: 2, 
    width: '100%'
  },
  input: {
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
  const [cookies, setCookie] = useCookies(["user"]);
  const cookiesLifetime = useMemo(() =>  new Date('3000-12-17T03:24:00'), []);
  const {data = [], isLoading, isSuccess, error} = useGetTasksQuery(cookies.user !== undefined ? cookies.user : null); 
  const [addTask, {isError}] = useAddTaskMutation();
  const [editTaskDb] = useEditTaskMutation()
  const [taskText, setTaskText]  = useState<string>('');
  const [errorInput, setErrorInput] = useState<boolean | undefined>(false);
  const task = {
    text: taskText,
    completed: false,
    userId: cookies.user,
  };
  const taskEdit = {
    id: state.id,
    text: taskText,
    completed: state.completed,
    userId: cookies.user,
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
  useEffect(() => {
    if (cookies.user === undefined) {
      setCookie("user", uuidv4(), { expires: cookiesLifetime })
    }
  }, [cookies.user, setCookie, cookiesLifetime])

  if (isLoading || cookies.user === undefined) {
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
  };
  if (isError || error) {
    toast.error('Error!');
  };
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
          sx={styles.input}
        />
        <Button
          color="info"
          variant="soft"
          onClick={() => hendleChangeAdd()}
          data-testid='add-button'
        >{state.id !== '' ? 'Save' : 'Add'}</Button>
      </Box>
      {isSuccess && (<Box sx={styles.tasksContainer} data-testid='task-card-container'>
        {data.map((task: TaskDb) => 
          <TaskCard key={task.id} id={task.id} text={task.text} completed={task.completed} userId={cookies.user} data-testid='task-card'/>
        )}
      </Box>)}
    </Box>
  );
}

export default Todo;