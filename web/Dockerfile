FROM node:18.15

RUN mkdir -p /usr/src/nuxt-app

COPY package.json /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

COPY . .

#RUN npm i nuxt
#RUN npm cache clean --force
#RUN npm run build

EXPOSE 3000

# CMD ["npm", "run", "start"]