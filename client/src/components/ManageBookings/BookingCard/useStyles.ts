import { makeStyles } from '@mui/styles';
import { theme } from '../../../themes/theme';

const useStyles = makeStyles(() => ({
  cardWrapper: {
    width: '300px',
    height: '120px',
    borderRadius: '5px',
    position: 'relative',
    outline: '0px',
    margin: '5px auto',
    padding: '5px',
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: '1px 1px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
  },
  icon: {
    marginLeft: '260px',
    color: theme.palette.primary.dark,
    fontWeight: 700,
  },
  date: {
    position: 'relative',
    top: '-20px',
    color: 'black',
  },
  details: {
    position: 'relative',
    top: '-10px',
    left: '-10px',
    width: '100%',
    height: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '60px',
    height: '60px',
    padding: '5px',
    paddingLeft: '10px',
    '& img': {
      width: '100%',
      height: '100%',
      display: 'block',
      margin: '0px auto',
      borderRadius: '50%',
    },
  },
  name: {
    paddingTop: '15px',
    textAlign: 'right',
    height: '50px',
  },

  status: {
    color: theme.palette.primary.dark,
    height: '50px',
  },
}));

export default useStyles;
