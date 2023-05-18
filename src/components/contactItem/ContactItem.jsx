import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectStatus, selectContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { update } from 'redux/updateSlice';

import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Loader } from '../loader/Loader';

import css from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default function ContactItem({ name, number, id }) {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const contacts = useSelector(selectContacts);

  const [clickedContact, setClickedContact] = useState({});

  const handleDeleteContact = id => {
    try {
      const deletingContact = contacts.filter(contact => contact.id === id);
      setClickedContact(deletingContact[0]);
      dispatch(deleteContact(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateContact = id => {
    try {
      const upContact = contacts.filter(contact => contact.id === id);
      dispatch(update(upContact[0]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'deletedContact' && clickedContact.name) {
      toast.info(`${clickedContact.name} deleted from contacts.`);
    }
  }, [status, clickedContact]);

  return (
    <li className={css.contactItem}>
      <div>
        <FaUserAlt className={css.contactItem__icon} />
        <span>{name}: </span>
        <span>{number}</span>
      </div>
      <div className={css.buttons}>
        <NavLink to="/contacts/update">
          <button
            className={css.contactButton}
            type="button"
            onClick={() => handleUpdateContact(id)}
          >
            <span>Update</span>
          </button>
        </NavLink>
        <button
          className={css.contactButton}
          type="button"
          onClick={() => handleDeleteContact(id)}
          disabled={status === 'deleting'}
        >
          <span>Delete</span>
          {status === 'deleting' && clickedContact.name && <Loader />}
        </button>
      </div>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
