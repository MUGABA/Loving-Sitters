import { FormikHelpers } from 'formik';
import AuthPageFooter from '../../components/AuthPageFooter/AuthPageFooter';
import AuthPageWrapper from '../../components/AuthPageWrapper/AuthPageWrapper';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { login } from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';

export default function Login(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <PageContainer>
      <AuthPageWrapper header="Log in">
        <LoginForm handleSubmit={handleSubmit} />
        <AuthPageFooter text="Not a member?" anchorText="Sign up" anchorTo="/signup" />
      </AuthPageWrapper>
    </PageContainer>
  );
}
