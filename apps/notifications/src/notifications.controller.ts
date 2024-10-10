import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('user-logged-in')
  async getHello(@Payload() data: any): Promise<void> {
    console.log('****User logged in****');
  }
}
