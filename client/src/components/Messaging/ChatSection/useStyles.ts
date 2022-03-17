import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    width: '100%',
    borderTop: 'solid',
    borderTopColor: theme.palette.primary.dark,
    position: 'fixed',
    bottom: '0',
  },
  input: {
    flex: 1,
    width: '100%',
    margin: '10px',
  },
  text: {
    width: '100%',
    border: 'none',
  },
  button: {
    flex: 1,
    margin: '10px',
    cursor: 'pointer',
  },
  chatRoom: {
    backgroundColor: 'white',
    width: '100%',
    height: '70vh',
    overflowY: 'auto',
  },
}));
