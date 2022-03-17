import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from '../../pages/Login/LoginForm/useStyles';
import CustomerBookingMockData from '../../mockData/CustomerBookingMockData';
import * as React from 'react';

interface Props {
  children: string;
  index: number;
  value: number;
}
const TabPanel = ({ children, index, value }: Props): JSX.Element => {
  const classes = useStyles();
  const [mockData, setMockData] = React.useState(CustomerBookingMockData);

  const switchStatus = (status: any) => {
    if (status === 'all') {
      setMockData(CustomerBookingMockData);
      return;
    }

    const eachStatus = CustomerBookingMockData.filter((item) => item.status === status);
    setMockData(eachStatus);
  };

  return (
    <>
      <Button className="filter-btn" onClick={() => switchStatus('current')}>
        current
      </Button>
      <Button className="filter-btn" onClick={() => switchStatus('past-due')}>
        past-due
      </Button>
      <Button className="filter-btn" onClick={() => switchStatus('paid')}>
        paid
      </Button>
    </>
  );
};

export default TabPanel;
