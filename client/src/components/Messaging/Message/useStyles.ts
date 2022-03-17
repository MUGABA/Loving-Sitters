import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  message: {
    width: 'inherit',
    backgroundColor: 'red',
  },
  sent: {
    width: '100%',
    display: 'flex',
    padding: '10px',
    justifyContent: 'flex-end',

    '& p': {},
    '& img': {
      display: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      margin: '2px 5px',
    },
  },
  received: {
    width: '500px',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '10px',
    '& img': {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      margin: '2px 5px',
    },
  },
  textRecieved: {
    display: 'flex',
    color: 'black',
    width: 'relative',
    textAlign: 'left',
    padding: '10px',
    fontSize: '18px',
    fontWeight: '20px',
    backgroundColor: '#F4F4F9',
    borderRadius: '5px',
  },
  textSent: {
    display: 'flex',
    color: 'black',
    width: 'relative',
    textAlign: 'left',
    padding: '10px',
    fontSize: '18px',
    fontWeight: '20px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
  },
}));
