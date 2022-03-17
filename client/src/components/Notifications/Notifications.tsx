import React, { useEffect, useState, useRef } from 'react';
import { Grid, Link, Popper, Badge } from '@mui/material';
import NotificaitonContent from '../NotificationContent/NotificationContent';
import { fetchAllUnreadNotifications, markNotificationsAsRead } from '../../helpers/APICalls/getNotifications';
import { Notifications, NotificationsApiData } from '../../interface/Notifications';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { User } from '../../interface/User';

const Notificaitons = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [unReadNotification, setUnReadNotification] = useState<Notifications[] | undefined>();

  const { updateSnackBarMessage } = useSnackBar();
  const { updateLoginContext } = useAuth();

  const { loggedInUser, profile, logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);

    markNotificationsAsRead(`${profile?.userId}`);
    if (anchorEl) {
      setUnReadNotification([]);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification' : undefined;
  const total = useRef(0);
  const unread = useRef();

  useEffect(() => {
    const fetchUnReadData = async () => {
      const getData = await fetchAllUnreadNotifications();
      total.current = getData.data.length;
      unread.current = getData.data;

      if (getData.error) {
        updateSnackBarMessage(getData.error.message);
      }

      if (getData.data[0] != undefined) {
        setUnReadNotification(getData.data[0].recieverId);
      }
    };
    fetchUnReadData();
  }, [updateSnackBarMessage]);

  return (
    <Grid sx={{ textAlign: 'center' }} xs={2} justifySelf="flex-end" item>
      <Link
        sx={{
          color: '#212121',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'color 120ms ease-in-out',
          '&:hover': {
            color: 'primary.main',
          },
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {unReadNotification === undefined || unReadNotification === null || unReadNotification?.length === 0 ? (
          <Badge color="secondary" badgeContent={0} showZero>
            <NotificationsActiveIcon />
          </Badge>
        ) : (
          <Badge color="secondary" badgeContent={total.current} showZero>
            <NotificationsActiveIcon />
            <FiberManualRecordIcon sx={{ color: '#64dd17', fontSize: 14, pb: '3px' }} />
          </Badge>
        )}
      </Link>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <NotificaitonContent unReadNotification={unReadNotification} />
      </Popper>
    </Grid>
  );
};

export default Notificaitons;
