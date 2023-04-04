import { TodoItem, TodoItemDb } from "./todoSlice"
import toast from 'react-hot-toast';

export const addTask = (task: TodoItem) => {
  try {
    fetch('http://localhost:3002/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task)
    })
    toast.success('Task added!');
  } catch (error) {
    console.log(error);
    toast.error('Error!');
  }
}

export const deleteTask = (id: number) => {
  try {
    fetch('http://localhost:3002/todo/' + id, {
      method: 'DELETE',
    })
    toast.success('Task deleted!');
  } catch (error) {
    console.log(error);
    toast.error('Error!');
  }
}

export const completedTask = (task: TodoItemDb) => {
  try {
    fetch('http://localhost:3002/todo/' + task.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task)
    })
    toast.success('Task completed!');
  } catch (error) {
    console.log(error);
    toast.error('Error!');
  }
}