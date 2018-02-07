FROM node:8.6.0-alpine

# Copy package file
COPY package.json ./

# Set npm values and remove cache
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Run npm install and Copy node_modules to application root /ng-app
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

# Make current directory the root application dirctory /ng-app
WORKDIR /ng-app

# Copy Angular application code to container
COPY . .

## Build the angular app in production mode and store in dist folder
RUN $(npm bin)/ng build --prod --build-optimizer

## Install nodemon in case I have to make changes on the fly
RUN npm install -g nodemon

# Expose a port to allow external access
EXPOSE 9090

# Start mean application
CMD ["nodemon", "server.js"]