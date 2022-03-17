import { Box } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import NotFound from '../NotFound/NotFound';
import { getRoutesAccordingToAccountType } from './route';

const RenderRoutes = (): JSX.Element => {
  const { profile } = useAuth();

  let accountType;

  if (profile) accountType = profile.accountType;

  const routes = getRoutesAccordingToAccountType(accountType);

  return (
    <Box>
      <Switch>
        {routes.map((item, i) => (
          <Route key={i} path={item.resource} component={item.component} />
        ))}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Box>
  );
};

export default RenderRoutes;
