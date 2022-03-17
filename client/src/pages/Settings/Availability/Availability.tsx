import { Button, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Field, Formik, FormikHelpers } from 'formik';
import React, { useContext, useState } from 'react';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { AuthContext } from '../../../context/useAuthContext';
import { SnackBarContext } from '../../../context/useSnackbarContext';
import useStyles from './makeStyle';
import GeneerateSchedules from './ScheduleForm';

interface AvailibilityProps {
  header: string;
}

const generateSchedules = (scheduleName: string): JSX.Element => {
  return (
    <MenuItem key={scheduleName} value={scheduleName}>
      {scheduleName}
    </MenuItem>
  );
};

function availabilityList(date: string, value: number) {
  return { date, value };
}

interface Values {
  scheduleChoose: string;
  monday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  tuesday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  wednesday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  thursday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  friday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  saturday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
  sunday: {
    active: boolean;
    startTime: string;
    endTime: string;
  };
}

const rows = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const Availability: React.FC<AvailibilityProps> = ({ header }) => {
  const classes = useStyles();
  const [checked, checkForAvailability] = React.useState([1]);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { loggedInUser } = useContext(AuthContext);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [updating, setUpdating] = useState(false);

  const updateAvailability = (newTime: string, param: string) => {
    if (param === 'start') {
      setStartTime(newTime);
    } else {
      setEndTime(newTime);
    }
    setUpdating(true);
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    checkForAvailability(newChecked);
  };

  const [schedules, setSchedules] = useState(['Working hours', 'Holidays']);

  return (
    <Box>
      <SettingHeader header={header} />
      <Formik
        initialValues={{
          scheduleChoose: schedules[0],
          monday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          tuesday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          wednesday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          thursday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          friday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          saturday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
          sunday: {
            active: true,
            startTime: '10',
            endTime: '22',
          },
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <form>
            <Field
              id="scheduleChoose"
              sx={{ height: '35px', width: 'auto', mr: 1, fontWeight: 700 }}
              name="scheduleChoose"
              as={Select}
            >
              {schedules.map((schedule) => generateSchedules(schedule))}
            </Field>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: '35px' }}
              disableElevation
              onClick={() => setSchedules(schedules.concat(['New Schedule']))}
            >
              + New Schedule
            </Button>
            <Typography variant="h3" sx={{ fontWeight: 500, fontSize: '18px', marginTop: 4, marginBottom: 2 }}>
              Set your weekly hours
            </Typography>
            <Box sx={{ border: '1px solid #dbdbdb', borderWidth: '1px 1px 0px 1px' }}>
              {rows.map((eachDay) => GeneerateSchedules(eachDay, values, setFieldValue, handleSubmit))}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Availability;
