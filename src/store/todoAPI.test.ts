export default null;
// import { addTask, deleteTask, completedTask } from "./todoAPI";

// describe('test fetch todo', () => {
//   it('addTask', async() => {
//     const task = {
//       text: 'content',
//       completed: false,
//     };

//     const mockResponse = { json: jest.fn().mockResolvedValue(task) };

//     const mockFetch = jest.fn().mockResolvedValue(mockResponse as any);

//     global.fetch = mockFetch;

//     const response = await addTask(task);

//     expect(response).toMatchObject(task);
//   });
  
//   it('completedTask', async() => {
//     const task = {
//       id: 1,
//       text: 'content',
//       completed: true,
//     };

//     const mockResponse = { json: jest.fn().mockResolvedValue(task) };

//     const mockFetch = jest.fn().mockResolvedValue(mockResponse as any);

//     global.fetch = mockFetch;

//     const response = await completedTask(task);

//     expect(response).toBe(task);
//   });

//   it('deleteTask', async() => {
//     const mockResponse = { json: jest.fn().mockResolvedValue(null) };

//     const mockFetch = jest.fn().mockResolvedValue(mockResponse as any);

//     global.fetch = mockFetch;

//     const id = 1;

//     await deleteTask(id);

//     expect(mockFetch).toHaveBeenCalledWith(`http://localhost:3002/todo/${id}`, { method: 'DELETE' });
//   });
// })