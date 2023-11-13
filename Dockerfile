FROM node:16.18.0

WORKDIR /usr/src/app/backend

COPY . .

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s","build"]