import { TodoItem } from "./todoSlice"

export const addTask = (task: TodoItem) => {
  try {
    fetch('http://localhost:3002/todo', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task)
    })
  } catch (error) {
    console.log(error);
  }
}