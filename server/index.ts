import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './lib/auth';
import { todos } from './routes/todo.routes';

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
  .route('/todos', todos)
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
