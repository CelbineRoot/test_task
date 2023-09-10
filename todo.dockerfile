FROM node:19-alpine

WORKDIR /app

COPY /todo-api/package*.json ./

RUN npm install

COPY /todo-api/ /app/

CMD ["npm", "run", "start"]