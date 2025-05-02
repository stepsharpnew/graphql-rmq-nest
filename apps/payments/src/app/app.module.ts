import { Module } from '@nestjs/common';
import { AppService } from './app.service';;
import { AppController } from './app.controller';
import { getRMQConfig } from '../config/rmq-congig';
import { RMQModule } from 'nestjs-rmq';
import { ConfigModule } from '@nestjs/config';

@Module({
 
  imports: [
    RMQModule.forRootAsync(getRMQConfig()),
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
  ],
  controllers  : [AppController],
  providers: [AppService],
})
export class AppModule {}
