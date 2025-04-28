import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(()=>String)
  async getUsers(){      
    const users =  await this.appService.handleUserCreated({email : '123'})    
    return users
  }
}