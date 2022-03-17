import { Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { useDebouncedCallback } from 'use-debounce/lib';
import { Box, Grid, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CloseIcon from '@mui/icons-material/Close';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { useStyles } from './useStyles';

interface Props {
  setLocation: Dispatch<SetStateAction<string>>;
  location: string;
  setDate: Dispatch<SetStateAction<string>>;
  date: string;
}

const Search = ({ location, date, setLocation, setDate }: Props): JSX.Element => {
  const classes = useStyles();

  const handleChangeDate = (event: string | null) => {
    if (event !== null) {
      try {
        const formattedDate = format(Date.parse(event), 'EEEE');
        setDate(formattedDate);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChangeLocation = (event: { target: { value: SetStateAction<string> } }) => {
    setLocation(event.target.value);
  };

  return (
    <Box>
      <Grid container justifyContent="center" className={classes.searchContainer}>
        <Grid item>
          <TextField
            id="search sitters"
            name="Search for Sitters"
            value={location}
            onChange={handleChangeLocation}
            variant="outlined"
            type="search"
            placeholder="ex. Toronto, Ontario"
            sx={{
              width: '300px',
              '.MuiOutlinedInput-root fieldset': {
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                borderWidth: '2px',
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className={classes.icon} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="DDDD"
              onChange={handleChangeDate}
              value={date}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: 'ex. Monday',
                    value: date,
                  }}
                  value={date}
                  sx={{
                    '.MuiOutlinedInput-root fieldset': {
                      borderTopLeftRadius: '0px',
                      borderBottomLeftRadius: '0px',
                      borderWidth: '2px',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                />
              )}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon className={classes.calendarIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <CloseIcon className={classes.closeIcon} onClick={() => setDate('')} />
                  </InputAdornment>
                ),
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
