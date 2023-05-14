import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/selectors';
import Navigation from 'components/navigation/Navigation';
import AuthNav from 'components/authNav/AuthNav';
import UserMenu from 'components/userMenu/UserMenu';
import css from './AppBar.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={css.appBar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
