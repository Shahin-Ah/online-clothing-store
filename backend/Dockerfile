FROM node:18.13.0-alpine As build
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
COPY . .
EXPOSE 8090
#USER node
CMD ["npm", "run", "dev"]
