# 1. Build stage
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev deps so that vite is available)
RUN npm install

# Copy source code
COPY . .

# Build the app (vite will output to /app/dist)
RUN npm run build

# 2. Serve with nginx
FROM nginx:stable-alpine

# Remove default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy the build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
