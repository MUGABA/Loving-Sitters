import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { Button, CircularProgress, InputLabel, Paper } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../../components/SettingsHeader/SettingsHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { makeStyles, styled } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  TableRow,
  TableHead,
  TableContainer,
  Typography,
  Grid,
  ButtonBase,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';

import React from 'react';
import useStyles from './makeStyles';
import customerBookingList from './CustomerBooking';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

interface CustomerBookingProps {
  header: string;
}

const CustomerBooking = ({ header }: CustomerBookingProps): JSX.Element => {
  const TAX_RATE = 0.0625;

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty: number, unit: number) {
    return qty * unit;
  }

  function createRow(desc: string, qty: number, unit: number) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  interface Row {
    qty: number;
    desc: string;
    unit: number;
    price: number;
  }

  function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  const rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
  ];

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
      }}
    >
      <SettingHeader header={header} />
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 150, height: 250 }}>
            <Img alt="complex" src="https://static3.bigstockphoto.com/4/3/4/large1500/434699045.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item sm>
              <Typography gutterBottom variant="subtitle1" component="div">
                Profile Name
              </Typography>
              <Typography variant="body2" gutterBottom>
                position
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: '2rem' }} />

      <Grid item>
        <Typography variant="h3" component="h3">
          Payment Detail
        </Typography>
      </Grid>

      <Box sx={{ mt: '5rem' }} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">QTY</TableCell>
              <TableCell align="center">DESCRIPTION</TableCell>
              <TableCell align="right">UNIT PRICE</TableCell>
              <TableCell align="right">AMOUNT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.desc}>
                <TableCell align="left">{row.qty}</TableCell>
                <TableCell align="center">{row.desc}</TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={4} colSpan={2} />
              <TableCell colSpan={0} align="right">
                Subtotal
              </TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Sale Tax {`${(TAX_RATE * 100).toFixed(2)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: '3rem' }} />

      <Grid container justifyContent="flex-end">
        <Grid item>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Payment Method</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="VISA - 1234" />
              <FormControlLabel value="male" control={<Radio />} label="MASTERCARD - 1234" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            style={{ maxWidth: '185px', maxHeight: '50px', minWidth: '175px', minHeight: '50px' }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerBooking;
