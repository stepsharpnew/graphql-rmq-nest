// apps/notifications/src/app/app.controller.ts
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any) {
    await this.appService.handleUserCreated(data);
  }
}