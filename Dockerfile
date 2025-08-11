FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for building/testing)
RUN npm ci

# Copy source code
COPY . .

# Build the TypeScript
RUN npm run build

# Run tests to ensure everything works
RUN npm test

CMD ["npm", "test"]