import { Grid, Box, Typography, Rating, Divider } from '@mui/material';
import PageContainer from '../../components/PageContainer/PageContainer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useStyles from './useStyles';
import Avatar from '@mui/material/Avatar';
import { User } from '../../interface/User';

interface ProfileDetailProps {
  loggedIn: boolean;
  user: User;
  photoUrl?: string;
  width?: number;
  height?: number;
}

const testProfileDetail = {
  name: 'grey naki',
  description: 'pet lover',
  location: 'Vancouver, Canada',
  introduction:
    'I grew up with animals my whole life. I have a passion for pets of all sizes and species. I am excited to be able to help you by caring for your pets while you are away. Your babies will be cared for and loved just as if they were my own.',
  hourlyRate: 16,
  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/61HtctiMZqL.jpg',
  rating: 3.7,
};

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Grid
        // maxWidth={windowWidth < 800 ? 400 : windowWidth < 1200 ? 600 : 1200}
        m={'auto'}
        justifyContent="space-around"
        container
        alignItems="flex-start"
        className={classes.pageDetail}
      >
        <Grid
          mb={{ xs: 3, sm: 0 }}
          xs={12}
          lg={6}
          item
          borderRadius={2}
          boxShadow={{ md: 2, lg: 4 }}
          container
          flexDirection="column"
        >
          <Box borderRadius={2} className={classes.coverImage}>
            <Avatar
              sx={(width) => ({
                [width.breakpoints.down('sm')]: { width: 130, height: 130, left: 130 },
                [width.breakpoints.up('sm')]: { width: 170, height: 170 },
              })}
              alt="Profile Image"
              src={testProfileDetail.photoUrl}
              style={{ top: '180px' }}
              className={classes.responsiveAvatar}
            />
          </Box>
          <Box m={{ xs: '8rem 0rem 2rem 0', md: '6rem 0 2rem 0', lg: '5rem 0 1rem 0' }} textAlign="center">
            <Typography fontWeight="bold" component="h1" fontSize="1.4rem">
              {testProfileDetail.name}
            </Typography>
            <Typography fontWeight="bold" color="rgba(0,0,0,0.3)">
              {testProfileDetail.description}
            </Typography>
          </Box>
          <Typography margin="auto" mb={4} display="flex" alignItems="center" color="rgba(0,0,0,0.3)" fontWeight="bold">
            <LocationOnIcon color="primary" /> &nbsp; {testProfileDetail.location}
          </Typography>
          <Box m={{ md: `${2} ${3}`, lg: 5 }}>
            <Typography margin="10px 10px" mb={1} fontSize="1.1rem" component="h2" fontWeight="bold">
              About me
            </Typography>
            <Typography margin="10px 10px">{testProfileDetail.introduction}</Typography>
          </Box>
        </Grid>
        <Divider sx={(width) => ({ [width.breakpoints.down('xs')]: { width: '100%' } })} />
        <Grid xs={12} lg={4} item borderRadius={2} boxShadow={{ lg: 2, xl: 4 }} container flexDirection="column">
          <Typography fontSize="1.1rem" component="p" fontWeight="bold" m="3rem auto 1rem auto">
            ${testProfileDetail.hourlyRate}/hr
          </Typography>
          <Rating sx={{ margin: 'auto' }} value={testProfileDetail.rating} precision={0.5} readOnly />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProfileDetails;
