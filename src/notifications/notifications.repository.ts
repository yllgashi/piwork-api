import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/database/base.repository';
import { Procedure } from 'src/shared/database/procedures';
import { Notification } from './model/notification.model';

@Injectable()
export class NotificationsRepository extends BaseRepository {
  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.execProc(
      Procedure.NOTIFICATIONS_GET_BY_USER,
      inputParams,
    );
    const notifications: Notification[] = this.mapNotifications(result);
    return notifications;
  }

  //#region mappers
  private mapNotifications(queryResult: any): Notification[] {
    const notifications: Notification[] = queryResult.map((e) => {
      const {
        Id,
        UserId,
        NotificationTopicId,
        NotificationTopicDescription,
        IsSent,
        IsRead,
        Message,
        Picture,
        InsertDate,
      } = e;
      const notification: Notification = {
        id: Id,
        userId: UserId,
        notificationTopicId: NotificationTopicId,
        notificationTopicDescription: NotificationTopicDescription,
        isSent: IsSent,
        isRead: IsRead,
        message: Message,
        picture: Picture,
        insertDate: InsertDate,
      };
      return notification;
    });
    return notifications;
  }
  //#endregion mappers
}
