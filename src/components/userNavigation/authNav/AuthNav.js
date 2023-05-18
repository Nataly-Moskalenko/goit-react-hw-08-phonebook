import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div className={css.authNav}>
      <NavLink
        className={navData => (navData.isActive ? css.active : css.link)}
        to="/register"
      >
        Registration
      </NavLink>
      <NavLink
        className={navData => (navData.isActive ? css.active : css.link)}
        to="/login"
      >
        Login
      </NavLink>
    </div>
  );
}
