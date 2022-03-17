import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: '420px',
    height: '100vh',
    boxShadow: '4px 4px 13px 7px rgba(217,217,217,0.26)',
    padding: theme.spacing(2),
    background: 'white',
  },
  header: {
    width: '400px',
    height: '100px',
    padding: theme.spacing(2),
    background: 'white',
    borderWidth: '1px 0px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
    position: 'relative',
    top: '-15px',
    display: 'flex',
  },
  chats: {
    position: 'relative',
    top: '-15px',
  },
}));
