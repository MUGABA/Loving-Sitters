import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 250,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: '10px',
    marginLeft: '10px',
  },
  responsiveTitle: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
}));
