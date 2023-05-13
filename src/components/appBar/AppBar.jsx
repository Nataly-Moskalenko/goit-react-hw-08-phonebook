import { NavLink, Outlet } from 'react-router-dom';
// import { Suspense } from 'react';
import css from './AppBar.module.css';

export default function AppBar() {
  return (
    <div className={css.appBar}>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/">Notes</NavLink>
      <NavLink to="/register">Registration</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/contacts">Welcome</NavLink>
      <NavLink to="/">Exit</NavLink>
      <main>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Outlet />
        {/* </Suspense> */}
      </main>
    </div>
  );
}
