import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { useGetTasksQuery } from './todoAPI';

// describe('todoApi', () => {
//   it('useGetTasksQuery', async () => {
//     const store = setupStore();
    
//     type Props = {
//       children: React.ReactNode;
//     };

//     const wrapper = ({ children }: Props) => {
//       return <Provider store={store}>{children}</Provider>
//     };

//     const { result } = renderHook(() => useGetTasksQuery(), { wrapper });

//     await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
//     expect(result.current.data).toEqual([
//       { id: 1, text: 'Task', completed: false },
//       { id: 2, text: 'Task', completed: false },
//     ]);
//   });
// });