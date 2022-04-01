import { Logout, Person, Settings } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
  AppBar,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import clsx from 'clsx';
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import Notifications from '../Notifications/Notifications';
import lovingSitterLogo from '../../images/logo.svg';
import { AccountType } from '../../types/AccountType';
import { useStyles } from './useStyles';
import ProfileDetail from '../../pages/ProfileDetails/ProfileDetails';

const NavbarButton = styled(Button)({
  padding: '5px 0',
});

const menuItems = [
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=petSitter',
    canView: null,
    authenticated: false,
  },
  {
    item: 'My Jobs',
    resource: '/my-jobs',
    canView: [AccountType.PET_SITTER],
    authenticated: true,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
  },

  {
    item: (
      <NavbarButton variant="outlined" size="large" fullWidth>
        Login
      </NavbarButton>
    ),
    resource: '/login',
    canView: null,
    authenticated: false,
  },
  {
    item: (
      <NavbarButton variant="contained" size="large" fullWidth disableElevation>
        Sign up
      </NavbarButton>
    ),
    resource: '/signup',
    canView: null,
    authenticated: false,
  },
];

const MenuItem: React.FC<{
  resource: string;
  item: string | JSX.Element;
}> = ({ resource, item }) => {
  const classes = useStyles();

  return (
    <Grid key={resource} sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      <NavLink className={classes.navbarItem} to={resource}>
        {item}
      </NavLink>
    </Grid>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { loggedInUser, profile, logout } = useAuth();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const renderMenuItems = () => {
    return menuItems.map((menu) => {
      if (menu.authenticated) {
        return loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      } else {
        return !loggedInUser && <MenuItem key={menu.resource} {...menu} />;
      }
    });
  };

  const matches = useMediaQuery('(min-width:1200px)');

  return (
    <Grid
      className={clsx(classes.navbar, location.pathname === '/' && classes.transparentNavbar)}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      container
    >
      <Grid xs={6} sm={4} item>
        <img className={classes.navbarLogo} src={lovingSitterLogo} />
      </Grid>
      <Grid xs={6} sm={4} item>
        {matches ? (
          <Grid container alignItems="center" gap={2} justifyContent="flex-end">
            {renderMenuItems()}
            {loggedInUser && (
              <Grid xs={2} item>
                <>
                  <IconButton
                    size="large"
                    aria-label="account profile picture"
                    aria-controls="menu-navbar"
                    arais-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    <Avatar
                      style={{ width: 50 }}
                      src={profile ? profile.photo : `https://robohash.org/${loggedInUser.email}`}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem component={NavLink} to="/profile/detail" onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </DropdownMenuItem>
                    <Divider />
                    <DropdownMenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </DropdownMenuItem>
                  </Menu>
                </>
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid container alignItems="center" gap={2} justifyContent="flex-end">
            {loggedInUser && (
              <Grid xs={3} item>
                <>
                  <IconButton
                    size="large"
                    aria-label="account profile picture"
                    aria-controls="menu-navbar"
                    arais-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                  >
                    <Avatar
                      style={{ width: 50 }}
                      src={profile ? profile.photo : `https://robohash.org/${loggedInUser.email}`}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <DropdownMenuItem component={NavLink} to="/dashboard" onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Become a sitter</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My job</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>My sitter</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Message</ListItemText>
                    </DropdownMenuItem>

                    <Divider />
                    <DropdownMenuItem component={NavLink} to="/profile/settings" onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </DropdownMenuItem>
                    <DropdownMenuItem component={NavLink} to="/profile/deatil" onClick={handleClose}>
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </DropdownMenuItem>
                    <Divider />
                    <DropdownMenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </DropdownMenuItem>
                  </Menu>
                </>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export { Navbar };
