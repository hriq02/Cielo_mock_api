FROM node

WORKDIR /Cielo_mock_sv

COPY . .

RUN npm install

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run" ,"start:dev"]