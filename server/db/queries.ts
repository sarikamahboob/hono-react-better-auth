import { desc } from "drizzle-orm"
import { db } from "./db"
import { todos } from "./schema"

export const getTodos = async () => {
    const todoList = await db.select().from(todos).orderBy(desc(todos.createdAt))
    return todoList
}

export const createTodo = async (todo: string) => {
    const newTodo = await db.insert(todos).values({ title: todo })
    return newTodo
}