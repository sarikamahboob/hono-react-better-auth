import { Hono } from "hono";
import { getTodosByUserId } from "../db/queries";
import { authMiddleware } from "../middlware/auth.middleware";
import { HonoEnv } from "../types";

export const todos = new Hono<HonoEnv>()
    .use(authMiddleware)
    .get('/', async (c) => {
            const user = c.get('user')
            try {
                const todos = await getTodosByUserId(user.id)
                return c.json(todos)
            } catch (error) {
                return c.json({ error: 'Failed to fetch todos' }, 500)
            }
        })