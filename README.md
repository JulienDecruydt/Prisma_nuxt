# Nuxt 4 + Prisma + PostgreSQL

A project to experiment with Prisma ORM and PostgreSQL in a Nuxt 4 environment.

## Setup

### 1. Install dependencies

```bash
yarn install
```

### 2. Configure environment

Create a `.env` file at the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 3. Setup database

```bash
npx prisma migrate dev --name "init"
```

## Prisma Commands

| Command                                | Description                                                              |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `npx prisma generate`                  | Generate Prisma Client from schema. Run after modifying `schema.prisma`. |
| `npx prisma migrate dev --name "name"` | Create and apply a new migration. Updates the database schema.           |
| `npx prisma migrate deploy`            | Apply pending migrations in production.                                  |
| `npx prisma db push`                   | Push schema changes directly without creating a migration (dev only).    |
| `npx prisma db pull`                   | Pull the database schema into `schema.prisma` (introspection).           |
| `npx prisma studio`                    | Open Prisma Studio GUI to browse/edit data.                              |
| `npx prisma db seed`                   | Run the seed script defined in `package.json`.                           |
| `npx prisma migrate reset`             | Reset database: drop all data, reapply migrations, run seed.             |

## Development

Start the development server on `http://localhost:3000`:

```bash
yarn dev
```

Clear cache if you encounter issues:

```bash
npx nuxt dev --clear
```

## Project Structure

```
├── prisma/
│   └── schema.prisma      # Database schema
├── server/
│   ├── api/               # API routes (use prisma here)
│   └── utils/
│       └── prisma.ts      # Prisma client instance (auto-imported)
└── app/
    └── app.vue            # Main app component
```

## Usage

Prisma is auto-imported in server routes:

```typescript
// server/api/posts.get.ts
export default defineEventHandler(async () => {
  return await prisma.post.findMany()
})
```

Fetch data from components:

```vue
<script setup lang="ts">
  const { data: posts } = await useFetch('/api/posts')
</script>
```
