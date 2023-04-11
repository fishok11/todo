import { TodoItem, TodoItemDb } from "./todoSlice"
import toast from 'react-hot-toast';

export const addTask = async(task: TodoItem) => {
  try {
    await fetch('http://localhost:3002/todo', {
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

export const deleteTask = async(id: number) => {
  try {
    await fetch('http://localhost:3002/todo/' + id, {
      method: 'DELETE',
    })
    toast.success('Task deleted!');
  } catch (error) {
    console.log(error);
    toast.error('Error!');
  }
}

export const completedTask = async(task: TodoItemDb) => {
  try {
    await fetch('http://localhost:3002/todo/' + task.id, {
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