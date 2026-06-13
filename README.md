# next-plate

A minimal, batteries-included [Next.js](https://nextjs.org) boilerplate powered by [Bun](https://bun.sh). Ships with type-safe APIs, authentication, a database, and a production-ready Docker setup.

## Tech Stack

- **[Next.js 16](https://nextjs.org)** + **React 19** — App Router
- **[Bun](https://bun.sh)** — runtime, package manager, and production server
- **[oRPC](https://orpc.dev)** — end-to-end type-safe API with middlewares
- **[Better Auth](https://better-auth.com)** — authentication framework for TypeScript
- **[Drizzle ORM](https://orm.drizzle.team)** — database with migrations and seeds
- **[TanStack Query](https://tanstack.com/query)** — client-side data mutation
- **[Biome](https://biomejs.dev)** — formatting and linting
- **[Zod](https://zod.dev)** — schema validation

## Getting Started

> Clone or click **"Use this template"** on GitHub to create your own repo, then:

```bash
# 1. Install dependencies
bun install

# 2. Configure environment
cp .env.example .env.local # then edit values

# 3. Set up the database
mkdir -p data
bun run db:generate
bun run db:migrate
bun run db:seed # optional

# 4. Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
.
├── app/            # Next.js App Router pages
│   ├── api/        # oRPC router, middlewares, and auth handler
│   └── auth/       # Login & register pages
├── components/     # Shared React components and providers
├── database/       # Drizzle schema, migrations, and seeds
├── features/       # Domain logic (auth, config, types)
├── hooks/          # Reusable React hooks
├── scripts/        # Build & database scripts
└── proxy.ts        # Route protection (auth redirects)
```

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Build the app |
| `bun run start` | Start the production server |
| `bun run -b bundle` | Build a minimal standalone bundle into `dist/` |
| `bun run db:generate` | Generate Drizzle migrations from the schema |
| `bun run db:migrate` | Apply migrations |
| `bun run db:seed` | Seed the database |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run check` | Lint & fix with Biome |
| `bun run format` | Format with Biome |
| `bun run type-check` | Type-check with TypeScript |

## Authentication

Auth is handled by Better Auth with the Drizzle adapter:

- Email/password and username login enabled out of the box
- Interactive API docs available at `/api/auth/docs`
- Route protection lives in `proxy.ts` — by default, `/dash/*` requires a session and authenticated users are redirected away from `/auth/*`

## API

oRPC routes are defined in `app/api/router/` and served under `/api/*`. Outputs are fully type-inferred on the client via `RPCOutputs`. A health check is available at `/api/health`.

## Deployment

### Docker Compose

```bash
BETTER_AUTH_SECRET=$(openssl rand -base64 32) docker compose up -d
```

The app is served on port `3000` and SQLite data persists in the `nextplate-data` volume.

### Docker

```bash
docker buildx build -t nextplate:latest .
docker run -p 3000:3000 -v nextplate-data:/app/data \
  -e BETTER_AUTH_URL=http://localhost:3000/api/auth \
  -e BETTER_AUTH_SECRET=your-secret \
  nextplate:latest
```

The multi-stage build produces a minimal image with a standalone server and runs migrations at build time.

## TODO
- [ ] Bring your own UI
- [ ] Use Postgres or [Turso](https://turso.tech) database
- [ ] Include migration files into your production builds
- [ ] Create migrator and run auto db migration on app run
- [ ] Make auth providers configurable instead of email/password-only
- [ ] Add optional email provider setup for production auth flows
- [ ] Add GitHub actions workflow to publish docker image

## License

[MIT](LICENSE)
