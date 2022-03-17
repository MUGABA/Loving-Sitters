import React, { useRef, useEffect, ChangeEvent, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

import useStyles from './useStyles';
import { useAuth } from '../../../context/useAuthContext';
import { User } from '../../../interface/User';
import { editPhoto, removePhoto } from '../../../helpers/APICalls/editProfile';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';

interface ProfilePhotoProps {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser }) => {
  const classes = useStyles();
  const { profile, updateLoginContext } = useAuth();
  const [file, setFile] = useState<File | string | null>('');
  const files = useRef<HTMLInputElement>(document.createElement('input'));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setFile(event.target.files.item(0));
    }
  };

  const handleClickUpload = () => {
    files.current.click();
  };

  const handleClickRemove = () => {
    removePhoto().then((data) => updateLoginContext(data));
  };

  useEffect(() => {
    if (file !== '') {
      editPhoto(file).then((data) => updateLoginContext(data));
    }
  }, [file, updateLoginContext]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <SettingHeader header={header} />
      <Avatar
        id="photo"
        sx={{
          width: 150,
          height: 150,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        src={profile?.photo}
      />
      <Typography
        variant="h3"
        sx={{
          fontWeight: 400,
          fontSize: '14px',
          marginTop: '25px',
          color: '#aaaaaa',

          width: '100%',
        }}
      >
        Be sure to use a photo that <br />
        clearly shows your face
      </Typography>
      <input ref={files} onChange={handleChange} name="profile_photo" type="file" style={{ display: 'none' }} />
      <Button
        sx={{
          fontSize: '14px',
          textTransform: 'none',
          marginBottom: '30px',
          height: 50,
          width: 250,
          border: '1px solid #f14140',
        }}
        onClick={handleClickUpload}
      >
        Upload a file from your device
      </Button>
      <Box
        sx={{
          mr: 0,
          height: 50,
        }}
      >
        <Button aria-label="delete" type="submit" onClick={handleClickRemove}>
          <DeleteIcon sx={{ mr: 0, color: 'black' }} />
          <Typography variant="body1" className={classes.textDisplay}>
            Delete photo
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
