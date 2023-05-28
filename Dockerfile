# Start from the official node.js 20 base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy local code to the container image
COPY . .

# Build the Next.js application
RUN yarn build

# Open the 3000 port
EXPOSE 3000

# Run the application
CMD [ "yarn", "start" ]
