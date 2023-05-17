import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCurrentUser } from 'redux/operations';
import { selectIsRefreshing } from 'redux/selectors';

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
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className={css.app}>
      {!isRefreshing && (
        <div className={css.appWrapper}>
          <AppBar></AppBar>

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
              path="contacts/:contactId"
              element={
                <PrivateRoute>
                  <UpdateContactView />
                </PrivateRoute>
              }
              />           
          </Routes>
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
