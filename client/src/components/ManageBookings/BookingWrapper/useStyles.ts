import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '400px',
    overflow: 'auto',
    borderRadius: '5px',
    position: 'relative',
    outline: '0px',
    padding: '5px',
    margin: '0px auto',
    backgroundColor: 'rgb(255, 255, 255)',
    '@media(max-width: 767px)': {
      width: '100%',
      alignItems: 'center',
      margin: '0px auto',
    },
  },
  contentWrapper: {
    width: '350px',
    height: '500px',
    overflowY: 'scroll',
    borderRadius: '5px',
    position: 'relative',
    outline: '0px',
    padding: '5px',
    margin: '0px auto',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  sectionHeader: {
    padding: '10px',
    margin: '5px 10px',
    fontSize: '15px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

export default useStyles;
