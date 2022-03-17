import { User } from './User';
import { Profile } from './Profile';
import { Notifications } from './Notifications';

export interface AuthApiDataSuccess {
  notification: Notifications;
  message: string;
  user: User;
  profile: Profile;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}
