import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { getRMQConfig } from '../config/rmq-congig';
import { RMQModule } from 'nestjs-rmq';
import { ConfigService } from '@nestjs/config';
import { UserSubService } from '../sub/user.sub.service';
import { EnvEnum } from '@my-workspace/my-nest-lib';

@Module({
  imports : [ 
    RMQModule.forRootAsync(getRMQConfig()),
    MongooseModule.forFeature([{name : User.name, schema : UserSchema}]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>(EnvEnum.JWT_ACCESS_SECRET),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserSubService],
  exports : [AuthService, JwtModule]
})
export class AuthModule {}
