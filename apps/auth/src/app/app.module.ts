import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserSubService } from './sub/user.sub.service';
import 'dotenv/config'


@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URI}`),
    GraphqlModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [UserSubService],
})
export class AppModule {}
