# Step 1: Use Node.js image for building the app
FROM node:22-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY backend/package*.json ./


COPY backend/tsconfig*.json ./

COPY backend/prisma ./


# Install dependencies
RUN npm install

# Copy the rest of the files
COPY backend/ ./

# Build the NestJS app
RUN npm run build

# Step 2: Use Node.js image to run the app
FROM node:22-alpine as runtime

# Set the working directory
WORKDIR /app

# Copy the build files from the build stage
COPY --from=build /app/dist /app/dist

# Copy package.json for runtime dependencies
COPY backend/package*.json ./

COPY backend/tsconfig*.json ./

COPY backend/prisma ./

# Install only the runtime dependencies
RUN npm install --production
RUN npm install @nestjs/cli

RUN npm install prisma

# Generate Prisma client
RUN npx prisma generate 

# Build the NestJS application
RUN npm run build

# Expose port 3000 (default for NestJS)
EXPOSE 3000

# Start the NestJS app
CMD ["node", "dist/main"]
