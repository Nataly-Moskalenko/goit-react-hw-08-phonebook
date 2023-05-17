import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { register } from 'redux/operations';
import { selectAuthStatus } from 'redux/selectors';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

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
  const status = useSelector(selectAuthStatus);  

  const handleSubmit = (values, { resetForm }) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      dispatch(register(newUser));
      // resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'registerRejected') {
      toast.info('Sorry, something went wrong. Please try again to register.');
      return;
    }
  }, [status]);

  return (
    <Formik
      initialValues={initialValues}     
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
          required
        />
        <ErrorMessage
          name="name"
          render={msg => <div className={css.registerError}>{msg}</div>}
        />
        <label className={css.registerEmail} htmlFor={emailInputId}>
          Email
        </label>
        <Field
          className={css.registerInput}
          type="email"
          name="email"
          id={emailInputId}          
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
          autoComplete="off"
          title="The password must be at least 7 characters long"
          required
        />
        <ErrorMessage
          name="password"
          render={msg => <div className={css.registerError}>{msg}</div>}
        />
        <button className={css.registerButton} type="submit">
          Register now
        </button>
      </Form>
    </Formik>
  );
}
