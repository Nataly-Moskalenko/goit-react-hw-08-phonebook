import { useSelector } from 'react-redux';
import { selectAuthStatus } from 'redux/selectors';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  const status = useSelector(selectAuthStatus);
  return (
    <div className={css.navigation}>
      <NavLink
        className={navData => (navData.isActive ? css.active : css.link)}
        to="/"
      >
        Home
      </NavLink>
      {status === 'isLoggedIn' && (
        <NavLink
          className={navData => (navData.isActive ? css.active : css.link)}
          to="/contacts"
        >
          Contacts
        </NavLink>
      )}
    </div>
  );
}
