export type TaskDb = {
  id: string;
  text: string;
  completed: boolean;
}

export type NewTaskDb = {
  text: string;
  completed: boolean;
}

export type TaskDbEdit = {
  id: string;
  text: string;
  completed: boolean;
}