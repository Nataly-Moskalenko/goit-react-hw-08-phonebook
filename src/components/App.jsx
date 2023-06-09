import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUser } from 'redux/operations';
import { selectAuthStatus } from 'redux/selectors';

import AppBar from './userNavigation/appBar/AppBar';
import HomeView from 'views/homeView/HomeView';
import RegisterView from 'views/registerView/RegisterView';
import LoginView from 'views/loginView/LoginView';
import ContactsView from 'views/contactsView/ContactsView';
import UpdateContactView from 'views/updateContactView/UpdateContactView';
import PrivateRoute from './userNavigation/privateRoute/PrivateRoute';
import RestrictedRoute from './userNavigation/restrictedRoute/RestrictedRoute';

import css from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className={css.app}>
      {status !== 'isRefreshing' && (
        <div className={css.appWrapper}>
          <AppBar />
          <Routes>
            <Route exact path="/" element={<HomeView />} />
            <Route
              path="register"
              element={
                <RestrictedRoute>
                  <RegisterView />
                </RestrictedRoute>
              }
            />
            <Route
              path="login"
              element={
                <RestrictedRoute>
                  <LoginView />
                </RestrictedRoute>
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsView />
                </PrivateRoute>
              }
            />
            <Route
              path="contacts/update"
              element={
                <PrivateRoute>
                  <UpdateContactView />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
