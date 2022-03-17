import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    width: '100%',
    height: '100px',
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
    display: 'flex',
    borderWidth: '1px 0px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
  },
  image: {
    width: '60px',
    height: '60px',
    marginBottom: '10px',
    '& img': {
      width: '80%',
      height: '80%',
      display: 'block',
      margin: '10px auto',
      borderRadius: '50%',
    },
  },
  content: {
    margin: 'auto 10px',
    fontFamily: theme.palette.primary.main,
    '& .message': {
      color: '#C8C8C8',
    },
  },
  icon: {
    margin: 'auto 10px',
    fontWeight: 'bold',
    display: 'flex',
    paddingLeft: '70%',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  online: {
    backgroundColor: '#4BB543',
    width: '15px',
    height: '15px',
    position: 'relative',
    left: '40px',
    top: '-25px',
    borderRadius: '50%',
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
  },
}));
