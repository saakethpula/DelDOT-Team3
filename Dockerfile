FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm ci
RUN npm run build -w @repo/database
RUN npm run build -w @repo/api
RUN npm run build -w ./apps/api

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080

CMD ["npm", "run", "start:prod", "-w", "./apps/api"]
