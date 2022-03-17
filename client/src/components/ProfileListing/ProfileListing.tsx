import React, { useEffect } from 'react';
import { searchProfiles } from '../../helpers/APICalls/searchUsers';
import { ApiUsersData, PetSitter } from '../../interface/Profile';
import { Box, Grid } from '@mui/material';

import NotFound from '../../pages/NotFound/NotFound';
import SitterCard from './SitterCard';
import staticData from './constants';

interface Props {
  debouncedLocation: string | null;
  date: string;
}

const ProfileListing = ({ debouncedLocation, date }: Props): JSX.Element => {
  const [profiles, setProfiles] = React.useState<ApiUsersData<PetSitter> | null>(null);

  useEffect(() => {
    (async () => {
      if (debouncedLocation && date) {
        const data = await searchProfiles({ location: debouncedLocation, availability: date });

        setProfiles(data);
      }
    })();
  }, [debouncedLocation, date]);

  const renderProfiles = () => {
    if (debouncedLocation === 'DEMO') {
      return staticData.map((sitter, id) => {
        return (
          <SitterCard
            key={id}
            photo={sitter.imageUrl}
            name={sitter.maintitle}
            subTitle={sitter.title}
            description={sitter.description}
            address={sitter.country}
            rate={sitter.price}
          />
        );
      });
    }
    if (profiles?.users?.length === 0) {
      return <NotFound />;
    }
    return profiles?.users?.map((profile) => {
      const { photo, name, description, address } = profile;
      return (
        <SitterCard
          key={profile.id}
          photo={photo}
          name={name}
          subTitle={'Pet Lover'}
          description={description}
          address={address}
          rate={profile.rate ? `${profile.rate}/hr` : '0.0/hr'}
        />
      );
    });
  };
  return (
    <Box>
      <Grid container spacing={7} alignItems="center" justifyContent="center">
        {renderProfiles()}
      </Grid>
    </Box>
  );
};

export default ProfileListing;
