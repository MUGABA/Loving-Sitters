import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  calendar: {
    zIndex: '-2',
    border: 'none',
    backgroundColor: 'white',
    width: '100%',
    fontFamily: theme.typography.fontFamily,
    '& .react-calendar__navigation__label': {
      color: theme.palette.primary.main,
      fontFamily: 'inherit',
      border: 'none',
      backgroundColor: 'inherit',
      margin: '20px 100px',
      fontWeight: 'bold',
      '@media(max-width: 767px)': {
        margin: '20px 60px',
        width: 'fit-content',
        with: '90%',
      },
    },
    '& .react-calendar__month-view__weekdays__weekday > abbr': {
      textDecoration: 'none',
      padding: '.90em .5em',
    },
    '& .react-calendar__navigation__prev2-button': {
      display: 'none',
    },
    '& .react-calendar__navigation__next2-button': {
      display: 'none',
    },
    '& .react-calendar__navigation__next-button': {
      border: 'none',
      backgroundColor: 'white',
    },
    '& .react-calendar__navigation__prev-button': {
      border: 'none',
      backgroundColor: 'white',
    },
    '& .react-calendar__tile': {
      padding: '.90em .5em',
      border: 'none',
      backgroundColor: 'white',
    },
    '& .react-calendar__tile--active': {
      backgroundColor: 'inherit',
      borderRadius: '50%',
      position: 'relative',
      border: 'none',
    },
    '& .react-calendar__tile--active > abbr::before': {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      display: 'inline-block',
      content: '""',
      backgroundColor: theme.palette.primary.main,
      padding: '15px 15px',
      borderRadius: '50%',
      zIndex: '-1',
    },
    '& .react-calendar__tile--active:enabled': {
      backgroundColor: 'inherit',
    },
    '& .react-calendar__tile--now': {
      backgroundColor: 'inherit',
    },
    '& .react-calendar__tile > abbr': {
      position: 'relative',
      zIndex: '2',
    },
    boxShadow:
      '0px 0px 1.9px rgba(0, 0, 0, 0.007),0px 0px 4.9px rgba(0, 0, 0, 0.014),0px 0px 9.9px rgba(0, 0, 0, 0.021),0px 0px 20.4px rgba(0, 0, 0, 0.031),0px 0px 56px rgba(0, 0, 0, 0.05)',
    marginBottom: theme.spacing(3),
    padding: '2px',
    '@media(min-width: 800px)': {
      padding: theme.spacing(3),
      width: '400px',
    },
    '@media(max-width: 767px)': {
      margin: '0px auto',
      width: 'fit-content',
      with: '90%',
    },
  },
  activeTile: {
    color: '#fff',
    '& ::before': {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      display: 'inline-block',
      content: '""',
      backgroundColor: theme.palette.primary.main,
      padding: '15px 15px',
      borderRadius: '50%',
      zIndex: '-1',
    },
  },
}));

export default useStyles;
