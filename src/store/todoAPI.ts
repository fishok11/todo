import { TodoItem } from "./todoSlice"

export const addTask = async(task: TodoItem) => {
  try {
    const response = await fetch('http://localhost:3002/todo', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(task)
    })
    const data = await response.json()
  } catch (error) {
    console.log(error);
  }
}