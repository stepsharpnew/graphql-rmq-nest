import { EnvEnum } from '@my-workspace/my-nest-lib';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const getRMQConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const host = configService.get(EnvEnum.RMQ_HOST);
    console.log('RabbitMQ Host:', host); 
      return {
      exchangeName: configService.get(EnvEnum.RMQ_EXCHANGE),
      connections: [
        {
          login: configService.get(EnvEnum.RMQ_LOGIN),
          password: configService.get(EnvEnum.RMQ_PASSWORD),
          host: configService.get(EnvEnum.RMQ_HOST),
          port:5672
        },
      ],
      queueName: 'third_queue',
      prefetchCount: 32,
      serviceName: 'payment',
    }
  }
    
});
