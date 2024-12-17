# Stage 1: Build Stage
FROM node:22-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production=false

# Copy the rest of the application code
COPY . .

# Build the application (uncomment if needed, e.g., for TypeScript)
RUN npm run build

# Stage 2: Production Stage
FROM node:22-alpine as production

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist # Adjust if your app's build output is elsewhere

# Install production dependencies
RUN npm install --production

# Expose the application's port
EXPOSE 3000

# Set the command to run the app
CMD ["node", "dist/index.js"] # Adjust the entry point as needed
