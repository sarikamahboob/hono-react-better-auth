import { Hono } from 'hono'

const app = new Hono()

const router = app
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })
  .get("/api/people", (c) => {
    return c.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "John Smith" },
      { id: 4, name: "Jane Smith" },
    ])
  })

export type AppType = typeof router

export default app
