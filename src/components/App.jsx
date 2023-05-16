import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCurrentUser } from 'redux/operations';

import AppBar from './appBar/AppBar';
import HomeView from 'views/homeView/HomeView';
import RegisterView from 'views/registerView/RegisterView';
import LoginView from 'views/loginView/LoginView';
import ContactsView from 'views/contactsView/ContactsView';

import css from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className={css.app}>
      <div className={css.appWrapper}>
        <AppBar></AppBar>

        <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="contacts" element={<ContactsView />} />             
        </Routes>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
