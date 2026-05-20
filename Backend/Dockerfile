FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

# Generate Prisma client
RUN DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder" npx prisma generate

# Build TypeScript code
RUN npm run build || npx tsc -b

FROM node:20-alpine AS runner

WORKDIR /app

# Copy only production dependencies and built output
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.js ./prisma.config.js

EXPOSE 3001

CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]
