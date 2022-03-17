import { Box, Button, Grid } from '@mui/material';
import SettingHeader from '../../components/SettingsHeader/SettingsHeader';
import stripeConnect from '../../helpers/APICalls/stripeConnect';

const StripeConnect = (): JSX.Element => {
  const createStripeAccount = async () => {
    const result = await stripeConnect();
    console.log(result);
  };

  return (
    <>
      <Grid xs={12} sm={3} item>
        <SettingHeader header="Payment Methods" />
        <Box sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            sx={{ padding: '20px', fontWeight: 'bold' }}
            onClick={() => {
              createStripeAccount();
            }}
          >
            Stripe Connect
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default StripeConnect;
