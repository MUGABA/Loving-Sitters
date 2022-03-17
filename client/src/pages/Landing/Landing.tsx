import React from 'react';
import { useStyles } from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { FormikHelpers } from 'formik';

import { Grid, Box, Typography } from '@mui/material';

import FindSitter from './FindSitter/FindSitter';

export default function Landing(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { where, dropIn, dropOff }: { where: string; dropIn: string; dropOff: string },
    { setSubmitting }: FormikHelpers<{ where: string; dropIn: string; dropOff: string }>,
  ) => {
    return null;
  };
  return (
    <Grid container className={classes.landingContainer} direction={{ xs: 'column-reverse', md: 'row' }}>
      <Grid item xs={12} md={6} container justifyContent="center" sx={{ maxWidth: 550 }}>
        <FindSitter handleSubmit={handleSubmit} />
      </Grid>
      <Grid item xs={12} md={6} container>
        <Box className={classes.heroContainer} />
      </Grid>
    </Grid>
  );
}
