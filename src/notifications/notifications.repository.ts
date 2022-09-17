import { Injectable } from '@nestjs/common';
import { MssqlService } from 'src/shared/database/mssql.service';
import { Procedure } from 'src/shared/database/procedures';
import { Notification } from './model/notification.model';

@Injectable()
export class NotificationsRepository  {
  constructor(private db: MssqlService) {}
  
  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    const inputParams = [{ name: 'userId', value: userId }];
    const { result } = await this.db.execProcedure(
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
