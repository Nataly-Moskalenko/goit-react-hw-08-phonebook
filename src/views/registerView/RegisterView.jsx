import { useDispatch } from 'react-redux';

import { register } from 'redux/operations';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

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
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    try {
      dispatch(register(newUser));
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

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
        <label className={css.registerEmail} htmlFor={emailInputId}>
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
        </button>
      </Form>
    </Formik>
  );
}
