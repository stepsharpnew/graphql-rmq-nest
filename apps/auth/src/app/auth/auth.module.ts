import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import 'dotenv/config'
import { RmqClientModule } from '@my-workspace/rmq-client';

@Module({
  imports : [
    // RmqClientModule.forRoot('notifications_queue', 'NOTIFICATIONS_CLIENT'),
    MongooseModule.forFeature([{name : User.name, schema : UserSchema}]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
