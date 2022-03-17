import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import ProfileListing from '../../components/ProfileListing/ProfileListing';
import Search from '../../components/ProfileListing/Search';
import socketIOClient from 'socket.io-client';

export default function Dashboard(): JSX.Element {
  const [date, setDate] = React.useState<string>('');
  const [location, setLocation] = React.useState<string>('');
  const [debouncedLocation] = useDebounce(location, 2000);
  const [response, setResponse] = useState('');
  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();
  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('connection', (data) => {
      setResponse(data);
    });
    socket.disconnect();
  }, []);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('disconnect', (data) => {
      setResponse('');
    });
  }, []);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

  return (
    <PageContainer>
      <Grid container>
        <Grid xs={12} item>
          <Typography sx={{ textAlign: 'center' }} variant="h4">
            Search Profiles
          </Typography>
          <Search setLocation={setLocation} setDate={setDate} location={location} date={date} />
          <ProfileListing debouncedLocation={debouncedLocation} date={date} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
