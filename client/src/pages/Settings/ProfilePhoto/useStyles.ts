import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  photoDisplay: {
    width: 150,
    height: 150,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '50px auto',
  },
  photoGeneral: {
    display: 'inline',
    margin: '0px auto',
    height: '100%',
    width: 'auto',
  },
  textDisplay: {
    textAlign: 'center',
    color: '#8e8e8e',
  },
  input: {
    margin: '50px auto',
  },
}));
export default useStyles;
