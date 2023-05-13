import { 
  useState, 
  FC 
} from 'react';
import { 
  // useAppSelector, 
  useAppDispatch 
} from '../store/hooks';
import { 
  // todoState,
  editTaskText,
} from '../store/todoSlice';
import { 
  useDeleteTaskMutation,
  useEditTaskMutation,
} from '../store/todoAPI';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import toast from 'react-hot-toast';

const styles = {
  card: {
    padding: '6px 10px', 
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
  },
  icoStyles: {
    fontSize: 'medium'
  }
}

type TodoCardProps = { 
  id: string; 
  text: string;
  completed: boolean;
  userId: string;
};

const TodoCard: FC<TodoCardProps> = ({id, text, completed, userId}) => {
  // const state = useAppSelector(todoState)
  const dispatch = useAppDispatch();
  const [deleteTask] = useDeleteTaskMutation();
  const [editTaskDb, {isError}] = useEditTaskMutation();
  const [completedCheck, setCompletedCheck] = useState(completed)
  const task = {
    id: id,
    text: text,
    completed: !completedCheck,
    userId: userId,
  };
  const hendleChangeCompleted = async(event: React.ChangeEvent<HTMLInputElement>) => {
    setCompletedCheck(event.target.checked);
    await editTaskDb(task).unwrap();
    if (completedCheck === false) toast.success('Task completed!');
  };
  const hendleChangeEdit = async() => {
    dispatch(editTaskText({id: id, text: text, completed: completed}));
    handleClose();
  };
  const hendleChangeDelete = async() => {
    await deleteTask(id).unwrap();
    toast.success('Task deleted!');
    handleClose();
  };

  const [menuItems, setMenuItems] = useState<null | HTMLElement>(null);
  const open = Boolean(menuItems);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuItems(event.currentTarget);
  };
  const handleClose = () => {
    setMenuItems(null);
  };

  if (isError) {
    toast.error('Error!');
  }

  return (
    <Card variant="outlined" sx={styles.card}>
      <Box sx={styles.defaultContainer}>
        <Box sx={styles.defaultContainer}>
          <Checkbox
            color="info"
            size="md"
            variant="outlined"
            checked={completed}
            onChange={(e) => hendleChangeCompleted(e)}
          />
          <Typography level="body1" sx={styles.textStyles}>{text}</Typography>
        </Box>
        <Box sx={styles.defaultContainer}>
          <Chip
            id="button"
            variant="outlined"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            color="info"
            size="sm"
            onClick={handleClick}
          >
            <MoreHorizIcon/>
          </Chip>
          <Menu
            id="menu"
            anchorEl={menuItems}
            open={open}
            onClose={handleClose}
            aria-labelledby="button"
            color="info"
            variant="outlined"
            placement="bottom-end"
          >
            <MenuItem
              variant="plain"
              onClick={() => hendleChangeEdit()}
            >
              <ListItemDecorator >
                <EditIcon sx={styles.icoStyles}/>
              </ListItemDecorator>{' '}
              Edit
            </MenuItem>
            <ListDivider/>
            <MenuItem
              color="danger"
              variant="plain"
              onClick={() => hendleChangeDelete()}
            >
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <DeleteOutlineIcon sx={styles.icoStyles}/>
              </ListItemDecorator>{'  '}
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Card>
  );
}


export default TodoCard;