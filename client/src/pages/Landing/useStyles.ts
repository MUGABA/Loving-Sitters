import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import heroImg from '../../images/landing/landing_page.webp';

export const useStyles = makeStyles((theme: Theme) => ({
  landingContainer: {
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      top: '-86.5px',
    },
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      justifyContent: 'center',
    },
  },
  heroContainer: {
    position: 'relative',
    backgroundImage: `url(${heroImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundPosition: '50% 50%',
    height: '200px',
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      height: '350px',
    },
    [theme.breakpoints.up('md')]: {
      height: '100vh',
      width: '100%',
    },
  },
}));
