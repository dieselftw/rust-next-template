# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Next.js development server port
EXPOSE 3000

# Run Next.js in development mode with hot-reloading
CMD ["npm", "run", "dev"]
