
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the optimized production files
RUN npm run build

# -------------------------------
# Stage 2: Serve with NGINX
# -------------------------------
FROM nginx:stable-alpine

# Remove default static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
