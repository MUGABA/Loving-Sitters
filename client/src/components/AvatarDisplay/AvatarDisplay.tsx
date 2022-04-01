import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../context/useAuthContext';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  const { profile } = useAuth();
  return <Avatar alt="Profile Image" src={profile ? profile.photo : `https://robohash.org/${user.email}.png`} />;
};

export default AvatarDisplay;
