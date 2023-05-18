import RegisterForm from 'components/registerForm/RegisterForm';

import css from './RegisterView.module.css';

export default function RegisterView() {
  return (
    <>
      <h1 className={css.registerTitle}>Registration Form</h1>
      <RegisterForm />
    </>
  );
}
