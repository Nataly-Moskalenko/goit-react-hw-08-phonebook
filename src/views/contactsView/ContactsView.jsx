import ContactForm from '../../components/contactForm/ContactForm';
import ContactList from '../../components/contactList/ContactList';
import Filter from '../../components/filter/Filter';
import { useSelector } from 'react-redux';
import { selectContacts, selectError } from 'redux/selectors';

import css from './ContactsView.module.css';

export default function ContactsView() {
  const contacts = useSelector(selectContacts);
  const error = useSelector(selectError);

  return (
    <div className={css.contactsView}>
      <h1>Phonebook</h1>
      <ContactForm />
      {error && (
        <p className={css.error}>Sorry, something went wrong: {error}</p>
      )}
      <h2>Contacts</h2>
      {contacts.length > 0 && <Filter />}
      <ContactList />
    </div>
  );
}
