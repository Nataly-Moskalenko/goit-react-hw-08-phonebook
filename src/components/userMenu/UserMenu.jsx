import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from 'redux/selectors';
import { logOut } from 'redux/operations';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);

  return (
    <div className={css.userMenu}>
      <span>Welcome, <b>{name}</b>!</span>
      <button type="button" className={css.userMenuButton} onClick={() => dispatch(logOut())}>
        Logout
      </button>
    </div>
  );
}
