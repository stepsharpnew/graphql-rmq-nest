import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserLoginInput, UserRegisterInput, UserResponse } from './dto/user.dto';
import { User } from './user.schema';
import { UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '../auth/strategies/auth.access.guard';
import { JwtRefreshGuard } from '../auth/strategies/auth.refresh.guard';
import { Response } from 'express';
import { PubSub } from 'graphql-subscriptions';
import { UserSubService } from '../sub/user.sub.service';


@Resolver()
export class UserResolver {
  private pubSub = new PubSub()
  constructor(
    private readonly userService: UserService,
    private readonly userSubService : UserSubService
  ) {}

  
  @Query(()=>[User])
  @UseGuards(JwtAccessGuard)
  async getUsers(){      
    const users =  await this.userService.getUser()    
    return users
  }

  @Query(()=>User)
  @UseGuards(JwtAccessGuard)
  async getMe(@Context() context : any){      
    const user = await this.userService.getMe(context.user.sub)    
    return user
  }

  @Mutation(() => UserResponse)
  async registration(
    @Args('dto') dto: UserRegisterInput,
    @Context() context: { res: Response }
  ) {
    const userResponse = await this.userService.registration(dto);
    this.userSubService.publish('newUserCreated',userResponse)
    context.res.cookie('refreshToken', userResponse.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite : 'lax'
    });
    return userResponse;
  }

  @Mutation(()=>UserResponse)
  async login(
    @Args('dto') dto : UserLoginInput,
    @Context() context: { res: Response }
  ){
    const userResponse = await this.userService.login(dto);
    context.res.cookie('refreshToken', userResponse.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite : 'lax'
    });
    return userResponse
  }

  @Mutation(()=>UserResponse)
  @UseGuards(JwtRefreshGuard)
  async refresh(@Context() context : any){
    const userResponse = await this.userService.refresh(context.user.sub, context.refreshToken)
    context.res.cookie('refreshToken', userResponse.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite : 'lax'
    });
    return userResponse
  }

  @Subscription(() => UserResponse, {
    resolve: (payload) => payload,
  })
  newUserCreated() {
    return this.userSubService.getPubSub().asyncIterableIterator('newUserCreated');
  }

}
