import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { Notification } from './model/notification.model';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return await this.notificationsRepository.getNotificationsByUser(userId);
  }
}
