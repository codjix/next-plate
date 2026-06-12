FROM oven/bun:1.3.14-alpine AS builder

WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bun run -b bundle
RUN mkdir data && \
  bun run -b db:generate && \
  bun run -b db:migrate && \
  cp -r data dist

FROM oven/bun:1.3.14-alpine

COPY --from=builder /app/dist /app

WORKDIR /app
VOLUME /app/data
EXPOSE 3000

CMD ["bun", "-b", "./server"]