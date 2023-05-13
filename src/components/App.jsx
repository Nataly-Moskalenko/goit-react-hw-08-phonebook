// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import ContactForm from './contactForm/ContactForm';
// import ContactList from './contactList/ContactList';
// import Filter from './filter/Filter';

import { Route, Routes } from 'react-router-dom';

import AppBar from './appBar/AppBar';
import HomeView from 'views/homeView/HomeView';
import RegisterView from 'views/registerView/RegisterView';
import LoginView from 'views/loginView/LoginView';
import ContactsView from 'views/contactsView/ContactsView';

import css from './App.module.css';

export function App() {
  return (
    <div className={css.app}>
      <AppBar />

      <Routes>
        <Route exact path="/" element={<HomeView />} />
        <Route path="register" element={<RegisterView />} />
        <Route path="login" element={<LoginView />} />
        <Route path="contacts" element={<ContactsView />} />
      </Routes>

      {/* <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>
        <Route path="/register">
          <RegisterView />
        </Route>
        <Route path="/login">
          <LoginView />
        </Route>
        <Route path="/contacts">
          <ContactsView />
        </Route>
      </Switch> */}

      {/* <div className={css.phonebook}>
        <h1>Phonebook</h1> */}
      {/* <ContactForm /> */}
      {/* <h2>Contacts</h2> */}
      {/* <Filter />
        <ContactList /> */}
      {/* </div> */}
      {/* <ToastContainer autoClose={3000} /> */}
    </div>
  );
}
