import './index.css';
import Todo from './components/Todo';
import Typography from '@mui/joy/Typography';

function App() {
  return (
    <>
      <Typography level="display2" sx={{ textAlign: 'center', marginBottom: '15px', color: '#F4EAFF' }}>Todo</Typography>
      <Todo/>
    </>
  )
}

export default App;
