// apps/notifications/src/app/app.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RMQRoute } from 'nestjs-rmq';
import { AuthLogin } from '@my-workspace/my-nest-lib'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @RMQRoute('user.login')
  // async handleUserCreated(@Payload() data: AuthLogin.Request):Promise<AuthLogin.Response> {
  //   console.log(data);
  //   await this.appService.handleUserCreated(data);
  //   return {succsess : true}
  // }
}