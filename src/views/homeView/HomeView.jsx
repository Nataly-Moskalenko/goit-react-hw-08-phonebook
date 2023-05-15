import css from './HomeView.module.css'

export default function HomeView() {
  return (
    <div className={css.home}>
      <p>Welcome to your personal Phonebook!</p>
      <p>Please register to use this Phonebook.</p>
      <p>If you have already registered, please login.</p>
    </div>
  );
}
