import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectAuthStatus } from 'redux/selectors';
import { logIn } from 'redux/operations';

import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import css from './LoginView.module.css';

export default function LoginView() {
  const initialValues = {
    email: '',
    password: '',
  };

  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);

  const handleSubmit = values => {
    const userLogIn = {
      email: values.email,
      password: values.password,
    };
    try {
      dispatch(logIn(userLogIn));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'loginRejected') {
      toast.info('Sorry, something went wrong. Please try again to login.');
      return;
    }
  }, [status]);

  return (
    <>
      <h1 className={css.loginTitle}>Login Form</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.loginForm}>
          <label htmlFor={emailInputId}>Email</label>
          <Field
            className={css.loginInput}
            type="email"
            name="email"
            id={emailInputId}
            autoComplete="off"
            required
          />
          <label className={css.loginPassword} htmlFor={passwordInputId}>
            Password
          </label>
          <Field
            className={css.loginInput}
            type="password"
            name="password"
            id={passwordInputId}
            autoComplete="off"
            required
          />
          <button className={css.loginButton} type="submit">
            Log In
          </button>
        </Form>
      </Formik>
    </>
  );
}
