export class Notification {
  id: number;
  userId: number;
  notificationTopicId: string;
  notificationTopicDescription: string;
  isSent: boolean;
  isRead: boolean;
  message: string;
  picture: string;
  insertDate: Date;
}
