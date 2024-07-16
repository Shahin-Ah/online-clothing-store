FROM node:18.13.0-alpine As build
#ENV NODE_ENV=production
WORKDIR /usr/src/app
#COPY ["package.json", "package-lock.json*", "./"]
#RUN npm cache clean --force
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD [ "npm", "run", "start" ]
#RUN npm run build --prod

#FROM nginx:latest
#COPY --from=build /usr/src/app/dist /usr/share/nginx/html
#COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

