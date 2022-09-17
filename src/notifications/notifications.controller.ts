import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';
import { Notification } from './model/notification.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Auth()
  @Get()
  async getNotificationsByUser(
    @CurrentUser('userId') userId: number,
  ): Promise<Notification[]> {
    return await this.notificationsService.getNotificationsByUser(userId);
  }
}
