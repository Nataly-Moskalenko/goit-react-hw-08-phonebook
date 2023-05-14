import { NavLink, Outlet } from 'react-router-dom';
import css from './Navigation.module.css';
// import { Suspense } from 'react';

export default function Navigation() {
  return (
    <div className={css.navigation}>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/contacts">Contacts</NavLink>
      <main>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
    </div>
  );
}
