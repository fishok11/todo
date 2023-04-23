import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskDb } from "./types";

type TasksResponse = TaskDb[]

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3002/'}),
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, number>({
      query: (limit) => `todo?${`_limit=${limit}`}`,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
            { type: 'Tasks', id: 'LIST' },
          ]
        : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: build.mutation<TaskDb, Partial<TaskDb>>({
      query: (body) => ({
        url: 'todo',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    completedTask: build.mutation<TaskDb, TaskDb>({
      query: (body) => ({
        url: `todo/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'Tasks', id: 'LIST'}]
    })
  })
});

export const {useGetTasksQuery, useAddTaskMutation, useCompletedTaskMutation, useDeleteTaskMutation} = todoApi;