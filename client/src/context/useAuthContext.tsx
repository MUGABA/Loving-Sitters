import { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { AuthApiData, AuthApiDataSuccess } from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile, PetSitter } from '../interface/Profile';
import { Notifications } from '../interface/Notifications';

interface IAuthContext {
  profile: PetSitter | Profile | null | undefined;
  loggedInUser: User | null | undefined;
  notifications: Notifications | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  profile: undefined,
  loggedInUser: undefined,
  notifications: undefined,
  updateLoginContext: () => null,
  logout: () => null,
});

const profileObj: Profile = {
  _id: '',
  type: '',
  userId: {
    name: '',
    email: '',
  },
  name: '',
  description: '',
  gender: '',
  address: '',
  telephone: '',
  photo: '',
  accountType: '',
  birthday: new Date(),
};

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [profile, setProfile] = useState<PetSitter | Profile | null | undefined>(profileObj);
  const [notifications, setNotifications] = useState<Notifications | null | undefined>();
  const history = useHistory();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      console.log(updateLoginContext);

      console.log(data);
      setLoggedInUser(data.user);
      setProfile(data.profile);
      setNotifications(data.notification);
      if (data.user && (history.location.pathname === '/login' || history.location.pathname === '/signup')) {
        history.push('/dashboard');
      }
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
        setProfile(undefined);
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          if (!(history.location.pathname === '/signup')) {
            history.push('/welcome');
          }
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider value={{ loggedInUser, profile, notifications, updateLoginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
