import { Module } from '@nestjs/common';
// import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
// import { GraphqlModule } from './graphql/graphql.module';
import { RmqServerModule } from '../rmq/rmq.module';
import { AppResolver } from './app.resolver';
import { AppController } from './app.controller';

@Module({
  imports: [RmqServerModule],
  controllers  : [AppController],
  providers: [AppService,AppResolver],
})
export class AppModule {}
