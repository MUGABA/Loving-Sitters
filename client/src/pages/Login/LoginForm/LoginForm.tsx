import Box from '@mui/material/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthButton from '../../../components/AuthButton/AuthButton';
import FormInput from '../../../components/FormInput/FormInput';
import useStyles from './useStyles';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <FormInput
            id="email"
            label="Email Address"
            fullWidth
            margin="normal"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            autoFocus
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
          />

          <FormInput
            id="password"
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
          />

          <Box
            component="div"
            textAlign="center"
            marginTop={5}
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <AuthButton type="submit" isSubmitting={isSubmitting} demo={false} displayText="Login" />
            <AuthButton displayText="Login & Demo" demo={true} />
          </Box>
        </form>
      )}
    </Formik>
  );
}
