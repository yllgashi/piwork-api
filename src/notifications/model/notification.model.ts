export class Notification {
  id: number;
  userId: number;
  notificationTopicId: string;
  isSent: boolean;
  isRead: boolean;
  message: string;
  insertDate: Date;
}
