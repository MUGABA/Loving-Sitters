import React from 'react';
import { Box } from '@mui/material';

interface CustomerBookingWrapperProps {
  customerNavbar: JSX.Element | JSX.Element[];
}

const CustomerBookingWrapper: React.FC<CustomerBookingWrapperProps> = ({ customerNavbar }) => {
  return (
    <Box
      sx={{
        background: '#fff',
        padding: 1,
        height: 900,
        marginRight: 1,
      }}
    >
      {customerNavbar}
    </Box>
  );
};

export default CustomerBookingWrapper;
