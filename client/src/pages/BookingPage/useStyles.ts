import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    '@media(max-width: 767px)': {
      width: '100%',
      alignItems: 'center',
      margin: '10px auto',
    },
  },
  boxMargin: {
    margin: '30px auto',
  },
}));

export default useStyles;
