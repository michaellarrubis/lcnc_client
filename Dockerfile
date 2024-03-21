FROM node:20
ENV NODE_ENV development
# Add a work directory
WORKDIR /lcnc_client/app
# Cache and Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copy app files
COPY . .
# Expose port
EXPOSE 3002