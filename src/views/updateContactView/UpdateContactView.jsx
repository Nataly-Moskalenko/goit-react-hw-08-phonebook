import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUpdate, selectStatus } from 'redux/selectors';
import { updateContact } from 'redux/operations';
import css from '../../components/contactForm/ContactForm.module.css';
import { update } from 'redux/updateSlice';

// import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import { Loader } from '../loader/Loader';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

export default function UpdateContactView() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const [upContact, setUpContact] = useState(useSelector(selectUpdate));
  const [updatedContact, setUpdatedContact] = useState(upContact);

  const [initialValues, setInitialValues] = useState({
    name: upContact.name,
    number: upContact.number,
    id: upContact.id,
  });

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const patternName =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const patternNumber =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  const schema = Yup.object().shape({
    name: Yup.string()
      .max(20, 'Name too long!')
      .matches(
        patternName,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required('Required'),
    number: Yup.string()
      .matches(
        patternNumber,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Required'),
  });

  const handleChangeContact = e => {
    dispatch(update(e.target.value));
    setUpContact(e.target.value);
  };

  const handleSubmit = values => {
    const updating = {
      name: values.name,
      number: values.number,
      id: upContact.id,
    };
    dispatch(update(updating));
    if (
      updating.name === initialValues.name &&
      updating.number === initialValues.number
    ) {
      toast.info(`You did not change anything in contact ${updating.name}.`);
      return;
    }
    try {
      dispatch(updateContact(updating));
      setInitialValues(updating);
      setUpdatedContact(updating);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'updatedContact') {
      toast.info(`Successfully updated ${updatedContact.name}.`);
    }
  }, [status, updatedContact]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      onChange={handleChangeContact}
    >
      <Form className={css.contactForm} autoComplete="off">
        <label className={css.contactName} htmlFor={nameInputId}>
          Name
        </label>
        <Field
          className={css.contactInput}
          type="text"
          name="name"
          id={nameInputId}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="name"
          render={msg => <div className={css.contactError}>{msg}</div>}
        />
        <label className={css.contactNumber} htmlFor={numberInputId}>
          Number
        </label>
        <Field
          className={css.contactInput}
          type="tel"
          name="number"
          id={numberInputId}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage
          name="number"
          render={msg => <div className={css.contactError}>{msg}</div>}
        />
        <button className={css.contactAddButton} type="submit">
          Update
        </button>
      </Form>
    </Formik>
  );
}
