import { 
  useState, 
  FC 
} from 'react';
import { 
  // useAppSelector, 
  useAppDispatch 
} from '../store/hooks';
import { 
  deleteTaskAsync,
  completedTaskAsync,
  updateDb,
} from '../store/todoSlice';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';


type TodoCardProps = { 
  id: number; 
  text: string;
  completed: boolean;
};

const TodoCard: FC<TodoCardProps> = ({id, text, completed}) => {
  // const state = useAppSelector(todo)
  const [completedCheck, setCompletedCheck] = useState(completed)
  const dispatch = useAppDispatch();
  const hendleChangeDelete = () => {
    dispatch(deleteTaskAsync(id));
    dispatch(updateDb());
  };
  const task = {
    id: id,
    text: text,
    completed: !completedCheck,
  };
  const hendleChangeCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompletedCheck(event.target.checked);
    dispatch(completedTaskAsync(task));
    dispatch(updateDb());
  };

  return (
    <Card variant="outlined" sx={{ padding: '4px 10px', backgroundColor: '#F4EAFF' }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography level="body1" sx={{ color: '#5F35AE' }}>{text}</Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
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