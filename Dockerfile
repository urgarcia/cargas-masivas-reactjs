# Stage 1: Build the React app
FROM node:18.18.0 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Serve the React app with Nginx
FROM nginx:latest

# Copy built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
