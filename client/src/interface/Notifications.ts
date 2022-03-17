import { Key, ReactNode } from 'react';

export interface Notifications {
  error: string;
  _id: string;
  userId: string;
  recieverId: string;
  time: Date;
  type: ReactNode;
  description: string;
  isRead: boolean;
  title: string;
}
export interface NotificationsApiData {
  notifications?: Notifications[];
  error?: { message: string };
}
