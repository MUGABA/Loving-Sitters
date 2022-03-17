import { User } from './User';

export interface Request {
  userId: string;
  sitterId: string;
  startDate: Date;
  endDate: Date;
  accepted: boolean;
  paid: boolean;
  requestStatus: string;
  user: User;
}
