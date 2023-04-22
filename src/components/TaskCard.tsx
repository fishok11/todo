import { 
  useState, 
  FC 
} from 'react';
// import { 
//   useAppSelector, 
//   useAppDispatch 
// } from '../store/hooks';
import { 
  useDeleteTaskMutation,
  useCompletedTaskMutation,
} from '../store/todoAPI';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import toast from 'react-hot-toast';

const styles = {
  card: {
    padding: '4px 10px', 
    backgroundColor: '#F4EAFF', 
  },
  defaultContainer: {
    display: 'flex', 
    gap: 2, 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  textStyles:{
    color: '#5F35AE'
  }
}

type TodoCardProps = { 
  id: number; 
  text: string;
  completed: boolean;
};

const TodoCard: FC<TodoCardProps> = ({id, text, completed}) => {
  // const state = useAppSelector(todo)
  // const dispatch = useAppDispatch();
  const [deleteTask] = useDeleteTaskMutation();
  const [completedTask, {isError}] = useCompletedTaskMutation();
  const [completedCheck, setCompletedCheck] = useState(completed)
  const task = {
    id: id,
    text: text,
    completed: !completedCheck,
  };
  const hendleChangeDelete = async() => {
    await deleteTask(id).unwrap();
    toast.success('Task deleted!');
  };
  const hendleChangeCompleted = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setCompletedCheck(event.target.checked);
    await completedTask(task).unwrap();
    toast.success('Task completed!');
  };

  if (isError) toast.error('Error!');

  return (
    <Card variant="outlined" sx={styles.card}>
      <Box sx={styles.defaultContainer}>
        <Typography level="body1" sx={styles.textStyles}>{text}</Typography>
        <Box sx={styles.defaultContainer}>
          <Checkbox
            color="info"
            size="md"
            variant="outlined"
            checked={completed}
            onChange={(e) => hendleChangeCompleted(e)}
          />
          <Chip
            color="danger"
            variant="plain"
            onClick={() => hendleChangeDelete()}
          >
            Delete
          </Chip>
        </Box>
      </Box>
    </Card>
  );
}


export default TodoCard;