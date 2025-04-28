import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserSubService } from './sub/user.sub.service';
import 'dotenv/config'
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports : [ConfigModule],
      inject : [ConfigService],
      useFactory: async (configService : ConfigService)=>({
        uri : configService.get('MONGO_URI')
      })
    }),
    GraphqlModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [UserSubService],
})
export class AppModule {}
