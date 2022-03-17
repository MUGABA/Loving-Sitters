import * as React from 'react';
import { Box, CircularProgress, Grid, Link, Divider, Typography } from '@mui/material';
import PageContainer from '../../../components/PageContainer/PageContainer';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PropTypes from 'prop-types';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';

import { Formik, FormikHelpers } from 'formik';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

export default function CustomerBookings(): JSX.Element {
  const { updateSnackBarMessage } = useSnackBar();

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const BookingPreview = (
    name: string,
    photo: string,
    start: Date,
    end: Date,
    description: string,
    hours: number,
    rate: number,
    status: string,
  ) => {
    const formatDate = (date: Date) => {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    };

    const startDate = new Date(start);
    const endDate = new Date(end);

    return (
      <Box
        sx={{ paddingBottom: '1rem', '&:hover': { backgroundColor: '#eee' } }}
        onClick={() => {
          setPetSitterName(name);
          setpetSitterDescription(description);
          setpetSitterRate(rate);
          setpetSitterPhoto(photo);
          setBookingHours(hours);
          setPaymentStatus(status);
        }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: 500, paddingLeft: '0.5rem' }}>{name}</Typography>
        <Typography sx={{ fontSize: '15px', paddingLeft: '0.5rem' }}>{`${formatDate(startDate)} - ${formatDate(
          endDate,
        )}`}</Typography>
      </Box>
    );
  };

  const handleChangeTabs = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const currentBookings = [
    {
      name: 'Iris Jen',
      description: 'dog-sitter is my career',
      photo:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F05%2F25%2Fhappy-woman-and-dog-713530465-2000.jpg',
      start: '2022-2-3',
      end: '2022-2-3',
      hours: 4,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Kelly Doe',
      description: 'I kiss dogs',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      start: '2022-2-15',
      end: '2022-2-16',
      hours: 2,
      rate: 25,
      status: 'current',
    },
    {
      name: 'Jennifer Lawrence',
      description: 'Most popular dog-sitter',
      photo:
        'https://images.ctfassets.net/nx3pzsky0bc9/9t9YStD9I5zJrEKqJcI44/273b4ab254c6208516c209a5aecec1b1/woman-on-couch-with-dog-and-cat820444297.png?w=355',
      start: '2022-3-3',
      end: '2022-3-4',
      hours: 27,
      rate: 22,
      status: 'current',
    },
    {
      name: 'Kelly Doe',
      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      description: 'I kiss dogs',
      start: '2022-9-09',
      end: '2022-9-10',
      hours: 12,
      rate: 25,
      status: 'current',
    },
  ];
  const pastDueBookings = [
    {
      name: 'Jenny L',
      description: 'Famous dog-sitter',
      photo: 'https://www.k9ofmine.com/wp-content/uploads/2018/01/how-much-does-dog-sitting-pay-1150x700.jpg',
      start: '2022-8-26',
      end: '2022-8-26',
      hours: 7,
      rate: 22,
      status: 'past-due',
    },
    {
      name: 'Jane Doe',
      description: 'I sit dogs',

      photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
      start: '2022-9-09',
      end: '2022-9-10',
      hours: 24,
      rate: 25,
      status: 'past-due',
    },
  ];
  const paidBookings = [
    {
      name: 'Fenny K',
      photo:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F05%2F25%2Fhappy-woman-and-dog-713530465-2000.jpg',
      description: 'I love take care animal',
      start: '2022-2-10',
      end: '2022-2-11',
      hours: 11,
      rate: 13,
      status: 'paid',
    },
    {
      name: 'Jace Kelly',
      photo:
        'https://images.ctfassets.net/nx3pzsky0bc9/9t9YStD9I5zJrEKqJcI44/273b4ab254c6208516c209a5aecec1b1/woman-on-couch-with-dog-and-cat820444297.png?w=355',
      description: 'walk dogs is my hobby',
      start: '2022-1-12',
      end: '2022-1-13',
      hours: 12,
      rate: 23,
      status: 'paid',
    },
  ];

  interface formValues {
    paymentMethodRadio: any;
  }

  const [tabValue, setTabValue] = React.useState(0);
  const [petSitterName, setPetSitterName] = React.useState('');
  const [petSitterDescription, setpetSitterDescription] = React.useState('');
  const [petSitterRate, setpetSitterRate] = React.useState(0);
  const [petSitterPhoto, setpetSitterPhoto] = React.useState('');
  const [bookingHours, setBookingHours] = React.useState(0);
  const [paymentStatus, setPaymentStatus] = React.useState('status');

  const platformFee = 5;
  const amount = bookingHours * petSitterRate;
  const invoiceTotal = platformFee + amount;
  const cards = ['VISA - 1234', 'MASTERCARD - 1234', 'AMEX - 1234'];
  const defaultCard = 'AMEX - 1234';

  const makePaymentRadioButton = (card: string) => {
    return <FormControlLabel value={card.toString()} control={<Radio />} label={card} />;
  };

  const doPayment = (num: number) => {
    return `${num.toFixed(2)}`;
  };

  return (
    <PageContainer>
      <Grid sx={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} container>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: '30px',
              textAlign: 'center',
              margin: '0 auto 1em',
              textTransform: 'capitalize',
              width: '100%',
            }}
          >
            your bookings
          </Typography>
        </Grid>
        <Grid item sm={12} md={4}>
          <Box>
            <Box sx={{}}>
              <Tabs scrollButtons={false} value={tabValue} onChange={handleChangeTabs} aria-label="basic tabs example">
                <Tab label="Current" />
                <Tab label="Past-Due" />
                <Tab label="Paid" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <Box maxHeight="600px" sx={{ marginBottom: '1rem', overflowY: 'scroll' }}>
                {currentBookings.map((booking: any) =>
                  BookingPreview(
                    booking.name,
                    booking.photo,
                    booking.start,
                    booking.end,
                    booking.description,
                    booking.hours,
                    booking.rate,
                    booking.status,
                  ),
                )}
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box maxHeight="800px" sx={{ marginBottom: '1rem', overflowY: 'scroll' }}>
                {pastDueBookings.map((booking: any) =>
                  BookingPreview(
                    booking.name,
                    booking.photo,
                    booking.start,
                    booking.end,
                    booking.description,
                    booking.hours,
                    booking.rate,
                    booking.status,
                  ),
                )}
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Box maxHeight="600px" sx={{ marginBottom: '1rem', overflowY: 'scroll' }}>
                {paidBookings.map((booking: any) =>
                  BookingPreview(
                    booking.name,
                    booking.photo,
                    booking.start,
                    booking.end,
                    booking.description,
                    booking.hours,
                    booking.rate,
                    booking.status,
                  ),
                )}
              </Box>
            </TabPanel>
          </Box>
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid>
            <Box sx={{ display: 'flex' }}>
              <Grid item sm={11}>
                <Box sx={{ display: 'flex' }}>
                  <Avatar
                    id="photo"
                    src={petSitterPhoto}
                    sx={{
                      width: 100,
                      height: 100,
                      marginRight: '1rem',
                    }}
                  />
                  <Box sx={{ display: 'block' }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: '30px',
                      }}
                    >
                      {petSitterName}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 400,
                        fontSize: '20px',
                        display: 'block',
                      }}
                    >
                      {petSitterDescription}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={1}>
                <Box display="flex" justifyContent="flex-end">
                  <Chip
                    label={paymentStatus}
                    color="primary"
                    sx={{ fontWeight: 700, fontSize: '15px', textTransform: 'capitalize', marginRight: '1rem' }}
                  />
                </Box>
              </Grid>
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 500,
                fontSize: '20px',
                display: 'block',
                marginTop: '3rem',
                marginBottom: '3rem',
                textTransform: 'capitalize',
              }}
            >
              payment details
            </Typography>

            <TableContainer>
              <Table sx={{ minWidth: 300, border: '1px solid #dbdbdb' }} aria-label="spanning table">
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: '#eeeeee',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                      Hours
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                      Description
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                      Hourly Rate
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="center">
                      {bookingHours}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }}>Dog-sitting service</TableCell>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="right">
                      {doPayment(petSitterRate)}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #dbdbdb' }} align="right">
                      {doPayment(amount)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ borderBottom: 'none' }} colSpan={2} />
                    <TableCell align="right" sx={{ borderBottom: 'none' }}>
                      Tax Fee
                    </TableCell>
                    <TableCell align="right" sx={{ border: '1px solid #dbdbdb' }}>
                      {doPayment(platformFee)}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: 'none' }}>
                    <TableCell colSpan={3} />
                    <TableCell align="right" sx={{ textTransform: 'uppercase', fontSize: '15px', fontWeight: 500 }}>
                      Total
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: 'white',
                        fontSize: '15px',
                        fontWeight: 400,
                        border: '1px solid #dbdbdc',
                      }}
                      align="right"
                    >
                      {doPayment(invoiceTotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Formik
              initialValues={{
                paymentMethodRadio: defaultCard.toString(),
              }}
              onSubmit={(values: formValues, { setSubmitting }: FormikHelpers<formValues>) => {
                updateSnackBarMessage('Payment submitted for processing');
                setTimeout(() => {
                  setSubmitting(false);
                }, 500);
              }}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" justifyContent="flex-end">
                    <FormControl disabled={paymentStatus === 'paid' ? true : false} sx={{ marginTop: '3rem' }}>
                      <FormLabel
                        sx={{ textTransform: 'capitalize', color: '#000000', fontSize: '15px', fontWeight: 500 }}
                      >
                        payment method
                      </FormLabel>
                      <RadioGroup
                        name="paymentMethodRadio"
                        value={values.paymentMethodRadio.toString()}
                        onChange={(e) => {
                          setFieldValue(e.target.name, e.target.value);
                          const message = `You have selected ${e.target.value}, which is not your default card (${defaultCard})`;
                          if (e.target.value !== defaultCard.toString()) {
                            updateSnackBarMessage(message);
                          }
                        }}
                      >
                        {cards.map((card) => makePaymentRadioButton(card))}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      size="large"
                      variant="outlined"
                      disableElevation
                      disabled={paymentStatus === 'paid' ? true : false}
                      sx={{
                        fontSize: '17px',
                        marginRight: '2rem',
                        marginTop: '1.5rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      {paymentStatus === 'paid' ? 'paid - thank you' : `Pay - $${invoiceTotal.toFixed(2)}`}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
