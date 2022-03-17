import { AccountType } from '../../types/AccountType';
import BookingPage from '../BookingPage/BookingPage';
import Dashboard from '../Dashboard/Dashboard';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import MessagingPage from '../Messaging/MessagingPage';
import NotFound from '../NotFound/NotFound';
import ProfileDetail from '../ProfileDetails/ProfileDetails';
import CustomerBookingList from '../Settings/CustomerBooking/CustomerBookingList';
import Settings from '../Settings/Settings';
import SignUp from '../SignUp/SignUp';

const menuItems = [
  {
    item: 'Landing',
    resource: '/welcome',
    canView: null,
    authenticated: false,
    component: Landing,
  },
  {
    item: 'Login',
    resource: '/login',
    canView: null,
    authenticated: false,
    component: Login,
  },
  {
    item: 'Sign up',
    resource: '/signup',
    canView: null,
    authenticated: false,
    component: SignUp,
  },
  {
    item: 'Become a Sitter',
    resource: '/dashboard',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
    component: Dashboard,
  },
  {
    item: 'Become a sitter',
    resource: '/signup?accountType=pet_sitter',
    canView: [AccountType.PET_OWNER, AccountType.PET_SITTER],
    authenticated: false,
    component: SignUp,
  },
  {
    item: 'My Sitters',
    resource: '/sitters',
    canView: [AccountType.PET_OWNER],
    authenticated: true,
    component: NotFound,
  },
  {
    item: 'Messages',
    resource: '/messages',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
    component: MessagingPage,
  },
  {
    item: 'Manage Bookings',
    resource: '/my-jobs',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
    component: BookingPage,
  },
  {
    item: 'Customer Booking',
    resource: '/customer/booking',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
    component: CustomerBookingList,
  },
  {
    item: 'Profile Detail',
    resource: '/profile/detail',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
    component: ProfileDetail,
  },
  {
    item: 'Settings',
    resource: '/profile/settings',
    canView: [AccountType.PET_SITTER, AccountType.PET_OWNER],
    authenticated: true,
    component: Settings,
  },
];

export const getAllRoutes = () => menuItems;

export const getRoutesAccordingToAccountType = (accountType?: string) => {
  const routes = [];
  for (const route of menuItems) {
    if (!route.canView) {
      routes.push(route);
    } else if (accountType && route.canView?.includes(accountType)) {
      routes.push(route);
    }
  }

  return routes;
};
