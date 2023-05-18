import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUpdate, selectStatus } from 'redux/selectors';
import { updateContact } from 'redux/operations';
import { update } from 'redux/updateSlice';

import { Loader } from 'components/loader/Loader';

import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import css from './UpdateForm.module.css';

export default function UpdateForm() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const [upContact, setUpContact] = useState(useSelector(selectUpdate));

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
      toast.info(
        `You did not change anything in the contact ${updating.name}.`
      );
      return;
    }
    try {
      dispatch(updateContact(updating));
      setInitialValues(updating);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'updatedContact') {
      toast.info(`Successfully updated the contact ${initialValues.name}.`);
    }
  }, [status, initialValues]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      onChange={handleChangeContact}
    >
      <Form className={css.updateContactForm} autoComplete="off">
        <label className={css.updateContactName} htmlFor={nameInputId}>
          Name
        </label>
        <Field
          className={css.updateContactInput}
          type="text"
          name="name"
          id={nameInputId}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="name"
          render={msg => <div className={css.updateContactError}>{msg}</div>}
        />
        <label className={css.updateContactNumber} htmlFor={numberInputId}>
          Number
        </label>
        <Field
          className={css.updateContactInput}
          type="tel"
          name="number"
          id={numberInputId}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage
          name="number"
          render={msg => <div className={css.updateContactError}>{msg}</div>}
        />
        <button className={css.updateContactButton} type="submit">
          {status === 'updating' && (
            <div className={css.updateContact}>
              <span>Updating</span>
              <Loader />
            </div>
          )}
          {status !== 'updating' && 'Update'}
        </button>
      </Form>
    </Formik>
  );
}
