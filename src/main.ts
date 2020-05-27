import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = require('http').createServer(app);
  const io = require('socket.io').listen(server);
  server.listen(8000);
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(8080);

}
bootstrap();
