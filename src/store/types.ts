export type TaskDb = {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
}

export type NewTaskDb = {
  text: string;
  completed: boolean;
  userId: string;
}

export type TaskDbEdit = {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
}