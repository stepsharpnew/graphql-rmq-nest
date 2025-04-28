// libs/rmq-client/src/lib/rmq-client.module.ts
import { DynamicModule, Global, Module } from '@nestjs/common';
import { createRmqClient } from './rmq-client.factory';

@Global()
@Module({})
export class RmqClientModule {
  static forRoot(queue: string, token = 'NOTIFICATIONS_CLIENT'): DynamicModule {
    return {
      module: RmqClientModule,
      
      providers: [
        {
          provide: token,
          useFactory: () => createRmqClient(queue),
        },
      ],
      exports: [token],
    };
  }
}
