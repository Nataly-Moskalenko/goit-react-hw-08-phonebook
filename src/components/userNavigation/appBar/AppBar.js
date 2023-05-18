import { useSelector } from 'react-redux';

import { selectAuthStatus } from 'redux/selectors';

import Navigation from 'components/userNavigation/navigation/Navigation';
import AuthNav from 'components/userNavigation/authNav/AuthNav';
import UserMenu from 'components/userNavigation/userMenu/UserMenu';

import css from './AppBar.module.css';

export default function AppBar() {
  const status = useSelector(selectAuthStatus);
  return (
    <header className={css.appBar}>
      <Navigation />
      {status === 'isLoggedIn' ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
