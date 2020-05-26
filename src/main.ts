import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const http = require('http');
  // const socketIo = require('socket.io');
  // const server = http.createServer(require('express'));
  // const io = socketIo(server);
  // const server = require('http').createServer(app);
  // const io = require('socket.io').listen(server);
  // server.listen(8000);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(8080);

}
bootstrap();

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
//
// const port = process.env.PORT || 4001;
// const index = require("./routes/index");
//
// const app = express();
// app.use(index);
//
// const server = http.createServer(app);
//
// const io = socketIo(server);
//
// let interval;
//
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });
//
// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };
//
// server.listen(port, () => console.log(`Listening on port ${port}`));
