FROM oven/bun:1.3.14-alpine AS builder

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN mkdir data && \
  bun run -b db:generate && \
  bun run -b db:migrate

RUN bun run -b bundle && \
  cp -r data dist

FROM oven/bun:1.3.14-alpine

COPY --from=builder /app/dist /app

WORKDIR /app
VOLUME /app/data
EXPOSE ${PORT:-3000}

CMD ["bun", "-b", "/app/server"]