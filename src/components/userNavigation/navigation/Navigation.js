import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/selectors';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Navigation.module.css';
// import { Suspense } from 'react';

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.navigation}>
      <NavLink to="/">Home</NavLink>
      {/* <NavLink to="/contacts">Contacts</NavLink>      */}
      {isLoggedIn && <NavLink to="/contacts">Contacts</NavLink>}
      <main>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
    </div>
  );
}
