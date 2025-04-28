import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: 'http://localhost:5173',
      credentials: true, 
    });
    const port = process.env.PORT || 3000;
    app.useWebSocketAdapter(new WsAdapter(app));
    app.use(cookieParser());
    await app.listen(port);
    Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
  } catch (error) {
    Logger.error('Ошибка запуска:', error);
  }
  
}

bootstrap();
