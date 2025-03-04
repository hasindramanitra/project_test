# Step 1: Use Node.js image to build the React app
FROM node:22-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY frontend/ ./

# Build the React app
RUN npm run build

# Step 2: Use a lightweight web server to serve the built app (Nginx)
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

COPY frontend/nginx.conf /etc/nginx/nginx.conf

# Expose port 3001 to the outside world
EXPOSE 80

# Start Nginx to serve the static files
CMD ["nginx", "-g", "daemon off;"]
