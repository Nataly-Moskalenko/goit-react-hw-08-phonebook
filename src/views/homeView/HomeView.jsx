import css from './HomeView.module.css';
// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from 'redux/selectors';

export default function HomeView() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.home}>
      {/* {isLoggedIn ? ( */}
        <p>Welcome to your personal Phonebook!</p>
      {/* ) : (
        <>
          <p>Welcome to your personal Phonebook!</p>
          <p>Please register to use this Phonebook.</p>
          <p>If you have already registered, please login.</p>
        </>
      )} */}
    </div>
  );
}
