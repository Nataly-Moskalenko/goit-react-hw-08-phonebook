import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { register } from 'redux/operations';
import { selectAuthStatus } from 'redux/selectors';

import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

import { Loader } from 'components/loader/Loader';
import css from './RegisterForm.module.css';

export default function RegisterForm() {
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

  const handleSubmit = values => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      dispatch(register(newUser));
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.registerForm}>
        <label className={css.registerName} htmlFor={nameInputId}>
          Name
        </label>
        <Field
          className={css.registerInput}
          type="text"
          name="name"
          id={nameInputId}
          autoComplete="off"
          required
        />
        <label className={css.registerEmail} htmlFor={emailInputId}>
          Email
        </label>
        <Field
          className={css.registerInput}
          type="email"
          name="email"
          id={emailInputId}
          autoComplete="off"
          required
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
        <button className={css.registerButton} type="submit">
          {status === 'pending' && (
            <div className={css.register}>
              <span>Register</span>
              <Loader />
            </div>
          )}
          {status !== 'pending' && 'Register now'}
        </button>
      </Form>
    </Formik>
  );
}
