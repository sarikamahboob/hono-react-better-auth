To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

1. Basic hono boilerplate setup
2. Basic vite boilerplate setup
3. Install concurrently
4. Config data fetching and RPC
5. Setup Postgres DB
6. Setup Drizzle ORM
7. Seed the DB
8. Get todos route
9. Daisy UI
10. Fetch todos with hono RPC
11. Display todos
12. Sign Up page
    Email/password Login
    Name input
    Input Validation
    Confirm Password
    Better auth client to signup
    Handle submit logic
    Redirect to /todos on sign up
    Redirect to /todos if already sign in
    Error state
    Loading state
    Already have an account ? Link to Sign in

Commands

```js
bun create hono@latest hono-react-better-auth
bun create vite
bun add -D concurrently
bun run db:up
bun add drizzle-orm pg dotenv
bun add -D drizzle-kit tsx @types/pg
bun add drizzle-seed
bun add -D daisyui@latest
bun add lucide
bun add lucide-react
bun add better-auth
bunx @better-auth/cli generate --config ./server/lib/auth.ts
bun run db:generate
bun run db:migrate
bun run db:studio
bun i open-cli
```
