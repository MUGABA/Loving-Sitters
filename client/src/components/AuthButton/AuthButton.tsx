import { Box, Button, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { loginWithDemo } from '../../helpers/APICalls/login';
import useStyles from '../../pages/Login/LoginForm/useStyles';

interface Props {
  isSubmitting?: boolean;
  displayText: string;
  type?: any;
  demo: boolean;
}
const AuthButton = ({ isSubmitting, displayText, type = 'button', demo, ...otherProps }: Props): JSX.Element => {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();

  const handleLoginDemoUser = () => {
    loginWithDemo().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Box>
      <Button
        size="large"
        variant="contained"
        color="primary"
        className={classes.submit}
        disableElevation
        sx={{ marginRight: '10px', marginLeft: '10px' }}
        type={type}
        onClick={async () => {
          demo ? await handleLoginDemoUser() : '';
        }}
        {...otherProps}
      >
        {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : displayText}
      </Button>
    </Box>
  );
};

export default AuthButton;
