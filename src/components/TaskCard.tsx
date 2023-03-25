import { 
  // useState, 
  FC 
} from 'react';
// import { 
//   useAppSelector, 
//   useAppDispatch 
// } from '../store/hooks';
import {
  // selectTask,
} from '../store/todoSlice';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';


type TodoCardProps = { 
  text: string 
};
const TodoCard: FC<TodoCardProps> = ({text}) => {
  return (
    <Card variant="outlined" sx={{ padding: '4px 10px', backgroundColor: '#F4EAFF' }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography level="body1">{text}</Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Checkbox
            color="info"
            size="md"
            variant="solid"
          />
          <Chip
            color="danger"
            onClick={function(){}}
            variant="plain"
          >
            Удалить
          </Chip>
        </Box>
      </Box>
    </Card>
  );
}


export default TodoCard;