export type TaskDb = {
  id: number;
  text: string;
  completed: boolean;
}

export type TaskDbEdit = {
  id: number | null;
  text: string;
  completed: boolean;
}