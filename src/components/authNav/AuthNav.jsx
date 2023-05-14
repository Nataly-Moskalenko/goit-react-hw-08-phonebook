import { NavLink, Outlet } from 'react-router-dom';
import css from './AuthNav.module.css';
// import { Suspense } from 'react';

export default function AuthNav() {
  return (
    <div className={css.authNav}>
      <NavLink to="/register">Registration</NavLink>
      <NavLink to="/login">Login</NavLink>
      <main>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
    </div>
  );
}
