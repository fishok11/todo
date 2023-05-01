import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3002/todo', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, text: 'Task', completed: false },
        { id: 2, text: 'Task', completed: false },
      ])
    );
  }),
]