import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserSubService } from '../sub/user.sub.service';
import { RmqClientModule } from '@my-workspace/rmq-client';

@Module({
  imports : [
    // RmqClientModule.forRoot('notifications_queue', 'NOTIFICATIONS_CLIENT'),
    MongooseModule.forFeature([{name : User.name, schema : UserSchema}]),
    AuthModule
  ],
  providers: [UserResolver, UserService, AuthService, UserSubService],
})
export class UserModule {}
