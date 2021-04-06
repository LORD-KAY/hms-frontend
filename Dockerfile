FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD [ "yarn", "run","serve"]