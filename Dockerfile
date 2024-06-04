FROM node:bookworm-slim

WORKDIR /Cielo_mock_sv

COPY . .

RUN npm install -g @nestjs/cli

RUN npm install

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run" ,"start:prod"]