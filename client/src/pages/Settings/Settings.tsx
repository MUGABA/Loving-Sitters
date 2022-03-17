import { Box, CircularProgress, Grid, Link, Hidden } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { cloneElement } from 'react';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import PageContainer from '../../components/PageContainer/PageContainer';
import PaymentMethods from '../../components/PaymentMethods/paymentMethods';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import SettingsWrapper from '../../components/SettingsWrapper/SettingsWrapper';
import { useAuth } from '../../context/useAuthContext';
import StripeConnect from '../StripeConnect/StripeConnect';
import EditProfile from './EditProfile/EditProfile';
import Availability from './Availability/Availability';
import ProfilePhoto from './ProfilePhoto/ProfilePhoto';

const settingsMenu = [
  {
    name: 'Edit profile',
    to: '/profile/settings/edit-profile',
    component: <EditProfile header="Edit Profile" />,
  },
  {
    name: 'Profile photo',
    to: '/profile/settings/profile-photo',
    component: <ProfilePhoto header="Profile Photo" />,
  },
  {
    name: 'Availability',
    to: '/profile/settings/availability',
    component: <Availability header="Your Availability" />,
  },
  {
    name: 'Payment methods',
    to: '/profile/settings/payment-methods',
    component: <PaymentMethods />,
  },
  {
    name: 'Billings',
    to: '/profile/settings/billings',
    component: <StripeConnect />,
  },
];

const useStyles = makeStyles({
  activeLink: {
    fontWeight: 700,
    color: '#000',
  },
});

export default function Settings(): JSX.Element {
  const { loggedInUser, profile } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser || !profile) {
    history.push('/login');

    return <CircularProgress />;
  }

  return (
    <PageContainer>
      <Grid sx={{ width: '100%' }} container>
        <Grid xs={12} md={3} sx={{ width: '100%', margin: '0 auto' }} item>
          {settingsMenu.map((item) => (
            <Box
              sx={{
                margin: '20px 20px',
              }}
              key={item.name}
            >
              <Link
                sx={{
                  fontSize: 20,
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 100ms ease-in-out',
                  '&:hover': {
                    color: '#000',
                  },
                }}
                component={NavLink}
                activeClassName={classes.activeLink}
                to={item.to}
              >
                {item.name}
              </Link>
            </Box>
          ))}
        </Grid>
        <Grid xs={12} sm={9} sx={{ width: '100%', margin: '10px auto' }} item>
          <Switch>
            <Route exact path="/profile/settings">
              <Redirect to="/profile/settings/edit-profile" />
            </Route>
            <SettingsWrapper>
              {settingsMenu.map((item) => (
                <Route
                  key={item.name}
                  path={item.to}
                  render={(props) =>
                    cloneElement(item.component, {
                      ...props,
                      currentUser: loggedInUser,
                      currentProfile: profile,
                    })
                  }
                />
              ))}
            </SettingsWrapper>
            <Route path="*">
              <Redirect to="/not-found" />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
