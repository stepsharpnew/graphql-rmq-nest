import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserSubService } from '../sub/user.sub.service';


@Module({
  imports : [
    MongooseModule.forFeature([{name : User.name, schema : UserSchema}]),
    forwardRef(() => AuthModule)

  ],
  providers: [UserResolver, UserService, UserSubService],
  exports : [UserSubService]
})
export class UserModule {}
