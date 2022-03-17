import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    textAlign: 'center',
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  icon: {
    color: theme.palette.primary.main,
    height: '25px',
    width: '25px',
  },
  calendarIcon: {
    color: theme.palette.primary.dark,
    height: '25px',
    width: '25px',
  },
  closeIcon: {
    color: theme.palette.primary.dark,
    height: '20px',
    width: '20px',
  },
  searchContainer: {
    marginTop: '50px',
    marginBottom: '50px',
  },
}));
