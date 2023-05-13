// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import { selectContacts, selectStatus } from 'redux/selectors';
import { logIn } from 'redux/operations';

// import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { nanoid } from 'nanoid';

// import { Loader } from '../loader/Loader';
import css from './LoginView.module.css';

export default function LoginView() {
  const initialValues = {   
    email: '',
    password: '',
  };

   const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const dispatch = useDispatch();
  // const contacts = useSelector(selectContacts);
  // const status = useSelector(selectStatus);

  // const [addedContact, setAddedContact] = useState({});

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
    const newContact = {     
      email: values.email,
      password: values.password,      
    };
    // if (
    //   contacts.find(
    //     contact => contact.name.toLowerCase() === values.name.toLowerCase()
    //   )
    // ) {
    //   toast.info(`${values.name} is already in contacts.`);
    // } else {
    try {
      dispatch(logIn(newContact));
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
      // validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={css.loginForm} autoComplete="off">       
        <label 
        // className={css.contactNumber} 
        htmlFor={emailInputId}>
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
          // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ErrorMessage
          name="password"
          render={msg => <div className={css.loginError}>{msg}</div>}
        />
        <button className={css.loginButton} type="submit">
          Log In
          {/* {status === 'adding' && (
            <div className={css.login}>
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