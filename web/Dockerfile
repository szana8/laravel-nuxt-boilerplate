FROM node:latest

RUN mkdir -p /usr/src/nuxt-app

# COPY ./package.json /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

COPY . .

#RUN npm i nuxt
#RUN npm cache clean --force
# RUN npm run dev

EXPOSE 3000

# CMD ["npm", "run", "start"]