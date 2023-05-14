import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import ContactForm from '../../components/contactForm/ContactForm';
// import ContactList from '../../components/contactList/ContactList';
// import Filter from '../../components/filter/Filter';

// import css from './App.module.css';

export default function ContactsView() {
  return (
    <div 
    // className={css.app}
    >
      <div 
      // className={css.phonebook}
      >
        <h1>Phonebook</h1>
        {/* <ContactForm /> */}
        <h2>Contacts</h2>
        {/* <Filter /> */}
        {/* <ContactList /> */}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}