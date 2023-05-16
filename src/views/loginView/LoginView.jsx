import { useDispatch } from 'react-redux';

import { logIn } from 'redux/operations';

import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { nanoid } from 'nanoid';

import css from './LoginView.module.css';

export default function LoginView() {
  const initialValues = {
    email: '',
    password: '',
  };

  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const dispatch = useDispatch();

  // const patternName =
  //   /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  // const patternNumber =
  //   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  // const schema = Yup.object().shape({
  //   name: Yup.string()
  //     .max(20, 'Name too long!')
  //     .matches(
  //       patternName,
  //       "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  //     )
  //     .required('Required'),
  // number: Yup.string()
  //   .matches(
  //     patternNumber,
  //     'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
  //   )
  //   .required('Required'),
  // });

  const handleSubmit = (values, { resetForm }) => {
    const userLogIn = {
      email: values.email,
      password: values.password,
    };
    try {
      dispatch(logIn(userLogIn));
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.loginForm} autoComplete="off">
        <label
          // className={css.contactNumber}
          htmlFor={emailInputId}
        >
          Email
        </label>
        <Field
          className={css.loginInput}
          type="email"
          name="email"
          id={emailInputId}
          // title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <ErrorMessage
          name="email"
          render={msg => <div className={css.loginError}>{msg}</div>}
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
          // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="password"
          render={msg => <div className={css.loginError}>{msg}</div>}
        />
        <button className={css.loginButton} type="submit">
          Log In
        </button>
      </Form>
    </Formik>
  );
}
