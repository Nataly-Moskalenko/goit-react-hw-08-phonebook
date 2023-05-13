// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import { selectContacts, selectStatus } from 'redux/selectors';
import { register } from 'redux/operations';

// import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

// import { Loader } from '../loader/Loader';
import css from './RegisterView.module.css';

export default function RegisterView() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const nameInputId = nanoid();
  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const dispatch = useDispatch();
  // const contacts = useSelector(selectContacts);
  // const status = useSelector(selectStatus);

  // const [addedContact, setAddedContact] = useState({});

  const patternName =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  // const patternNumber =
  //   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  const schema = Yup.object().shape({
    name: Yup.string()
      .max(20, 'Name too long!')
      .matches(
        patternName,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required('Required'),
    // number: Yup.string()
    //   .matches(
    //     patternNumber,
    //     'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    //   )
    //   .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      name: values.name,
      email: values.email,
      password: values.password,
      // createdAt: Date.now(),
    };
    // if (
    //   contacts.find(
    //     contact => contact.name.toLowerCase() === values.name.toLowerCase()
    //   )
    // ) {
    //   toast.info(`${values.name} is already in contacts.`);
    // } else {
    try {
      dispatch(register(newContact));
      // setAddedContact(newContact);
      // toast.info(`Adding ${values.name} to contacts.`);
      resetForm();
    } catch (error) {
      console.log(error);
    }
    // }
  };

  // useEffect(() => {
  //   if (status === 'addedContact') {
  //     toast.info(`${addedContact.name} added to contacts.`);
  //   }
  // }, [status, addedContact]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.registerForm} autoComplete="off">
        <label className={css.registerName} htmlFor={nameInputId}>
          Name
        </label>
        <Field
          className={css.registerInput}
          type="text"
          name="name"
          id={nameInputId}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="name"
          render={msg => <div className={css.registerError}>{msg}</div>}
        />
        <label
          className={css.registerEmail}
          htmlFor={emailInputId}
        >
          Email
        </label>
        <Field
          className={css.registerInput}
          type="email"
          name="email"
          id={emailInputId}
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage
          name="email"
          render={msg => <div className={css.registerError}>{msg}</div>}
        />
        <label className={css.registerPassword} htmlFor={passwordInputId}>
          Password
        </label>
        <Field
          className={css.registerInput}
          type="password"
          name="password"
          id={passwordInputId}
          // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="password"
          render={msg => <div className={css.registerError}>{msg}</div>}
        />
        <button className={css.registerButton} type="submit">
          Register now
          {/* {status === 'adding' && (
            <div className={css.register}>
              <span>Adding</span>
              <Loader />
            </div>
          )} */}
          {/* {status !== 'adding' && 'Add contact'} */}
        </button>
      </Form>
    </Formik>
  );
}
