# Use official Node.js LTS image
FROM node:18-alpine

ENV DB_USER=postgres
ENV DB_PASSWORD=password
ENV DB_NAME=userdb
ENV DB_HOST=postgres-db
ENV DB_PORT=5432

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port your backend runs on
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
