import { useSelector } from 'react-redux';
import { selectError } from 'redux/selectors';
import UpdateForm from 'components/updateForm/UpdateForm';
import css from './UpdateContactView.module.css';

export default function UpdateContactView() {
  const error = useSelector(selectError);

  return (
    <>
      <h1 className={css.updateContactTitle}>Contact update page</h1>
      <UpdateForm />
      {error && (
        <p className={css.error}>Sorry, something went wrong: {error}</p>
      )}
    </>
  );
}
