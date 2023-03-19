// import React, { useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

const Todo = () => {
  // const count = useAppSelector();
  // const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Input
        color="info"
        disabled={false}
        size="md"
        variant="soft"
        placeholder="Вводите здесь…"
      />
      <Button
        color="info"
        // onClick={function(){}}
        variant="soft"
      >Добавить</Button>
    </Box>
  );
}

export default Todo;