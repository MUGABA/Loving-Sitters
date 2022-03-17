import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  pageDetail: {
    width: 800,
    [theme.breakpoints.up('lg')]: {
      width: 1200,
    },
    [theme.breakpoints.down('xs')]: {
      width: 400,
    },
  },

  responsiveTitle: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },

  coverImage: {
    position: 'relative',
    backgroundImage: 'url("https://image.shutterstock.com/image-photo/human-dog-girl-her-friend-260nw-1494711500.jpg")',
    backgroundSize: 'cover',
    minHeight: 200,
    '& > *': {
      position: 'absolute',
      top: -235,
      left: 'calc(50% - 55px)',
      border: '5px solid ghostwhite',
    },
    '@media(min-width:600px)': {
      minHeight: 300,
      '& > *': {
        top: 120,
        left: 'calc(50% - 80px)',
      },
    },
  },

  responsiveAvatar: {
    position: 'relative',
    width: 170,
    height: 170,
    // [theme.breakpoints.up('sm')]: {
    //   position: 'relative',
    //   width: 170,
    //   height: 170,
    // },
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      width: 100,
      height: 100,
      fullWidth: { width: '100%' },
    },
  },
}));

export default useStyles;
