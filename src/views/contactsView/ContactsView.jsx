import ContactForm from '../../components/contactForm/ContactForm';
import ContactList from '../../components/contactList/ContactList';
import Filter from '../../components/filter/Filter';
import { useSelector } from 'react-redux';
import { selectContacts, selectIsLoggedIn } from 'redux/selectors';

import css from './ContactsView.module.css';

export default function ContactsView() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const contacts = useSelector(selectContacts);

  return (
    <>
      {isLoggedIn ? (
        <div className={css.contactsView}>
          <h1>Phonebook</h1>
          <ContactForm />
          <h2>Contacts</h2>
          {contacts.length > 0 && <Filter />}
          <ContactList />
        </div>
      ) : (
        <p className={css.contactsView__descr}>
          Please login to access your contacts.
        </p>
      )}
    </>
  );
}
