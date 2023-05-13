import { 
  createApi, 
  fakeBaseQuery, 
} from '@reduxjs/toolkit/query/react';
import { 
  TaskDb, 
  NewTaskDb, 
} from "./types";
import db from '../firebase'; 
import {
  doc,
  collection, 
  addDoc, 
  updateDoc,
  getDocs, 
  deleteDoc,
  query, 
  where,
} from 'firebase/firestore';

export type TasksResponse = TaskDb[]

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Tasks'],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, string>({
      async queryFn(userId) {
        try {
          const todoRef = query(collection(db, "todo"), where("userId", "==", userId));
          const querySnaphot = await getDocs(todoRef);
          let tasks: TasksResponse = [];
          querySnaphot?.forEach((doc) => {
            const task: TaskDb = {
              id: doc.id,
              text: doc.data().text,
              completed: doc.data().completed,
              userId: doc.data().userId,
            }
            tasks.push(task);
          });
          return { data: tasks };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) => result
      ? [
        ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
          { type: 'Tasks', id: 'LIST' },
        ]
      : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: build.mutation<null, NewTaskDb>({
      async queryFn(task)  {
        try {
          await addDoc(collection(db, "todo"), task); 
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    editTask: build.mutation<null, TaskDb>({
      async queryFn(task) {
        try {
          const docTask = doc(db, "todo", task.id);
          await updateDoc(docTask, task);
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    deleteTask: build.mutation<null, string>({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "todo", id));
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    })
  })
});

export const { useGetTasksQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = todoApi;