# Stage 1: Build the TypeScript application
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN yarn build

# Stage 2: Create the production image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the port the app listens on (replace with your app's port)
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/index.js"]