import LoginForm from 'components/loginForm/LoginForm';
import css from './LoginView.module.css';

export default function LoginView() {
  
  return (
    <>
      <h1 className={css.loginTitle}>Login Form</h1>
      <LoginForm/>      
    </>
  );
}
