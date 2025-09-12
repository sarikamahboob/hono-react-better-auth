import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getTodos } from './db/queries'
import { auth } from './lib/auth';

const app = new Hono().basePath('/api')

// Add CORS middleware
app.use('/*', cors({
  origin: [process.env.CLIENT_URL!],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

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
