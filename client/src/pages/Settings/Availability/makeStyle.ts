import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B, #FE6B8B)',
    border: 0,
    marginBottom: 5,
    padding: '5px 10px',
  },

  icon: {
    margin: '0 5px',
    color: theme.palette.primary.main,
  },
  table: {
    width: '100%',
    border: '1px solid RGB(0, 0, 0, .25)',
    borderRadius: theme.shape.borderRadius,
  },
  tableRow: {
    borderBottom: '1px solid RGB(0, 0, 0, .25)',
  },
  selectAvailableTime: {
    height: 35,
    width: 12,
  },
}));
export default useStyles;
