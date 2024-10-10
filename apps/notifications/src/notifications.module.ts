import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { LoggerModule } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [LoggerModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, ConfigService],
})
export class NotificationsModule {}
