import css from './HomeView.module.css';
import image from '../../images/4560176.jpg';

export default function HomeView() {
  return (
    <div className={css.home}>
      <h1>Welcome to your personal Phonebook!</h1>
      <img src={image} alt="Phonebook" className={css.homeImage} />
    </div>
  );
}
