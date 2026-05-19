FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies needed for build)
RUN npm install

# Copy source and prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build || npx tsc -b

FROM node:20-alpine AS runner

WORKDIR /app

# Copy only production dependencies and built output
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist

# Expose port (adjust if your app uses a different one, usually 8080 or 3000)
EXPOSE 8080

# Command to run
CMD ["node", "dist/index.js"]
