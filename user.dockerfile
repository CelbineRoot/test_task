FROM node:19-alpine

WORKDIR /app

COPY /user-api/package*.json ./

RUN npm install

COPY /user-api/ /app/

CMD ["npm", "run", "start"]