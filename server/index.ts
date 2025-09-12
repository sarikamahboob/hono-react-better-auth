import 'dotenv/config'
import { Hono } from 'hono'
import { getTodos } from './db/queries'
import { auth } from './lib/auth';

const app = new Hono().basePath('/api')

const router = app
  .on(["POST", "GET"], "/auth/*", (c) => {
    return auth.handler(c.req.raw);
  })
  .get('/todos', async (c) => {
    try {
      const todos = await getTodos()
      return c.json(todos)
    } catch (error) {
      return c.json({ error: 'Failed to fetch todos' }, 500)
    }
  })
  .get("/people", (c) => {
    return c.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "John Smith" },
      { id: 4, name: "Jane Smith" },
    ])
  })

export type AppType = typeof router

export default app
