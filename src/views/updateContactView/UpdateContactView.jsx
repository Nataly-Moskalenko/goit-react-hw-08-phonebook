import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectError, selectStatus } from 'redux/selectors';
import UpdateForm from 'components/updateForm/UpdateForm';
import css from './UpdateContactView.module.css';

export default function UpdateContactView() {
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  return (
    <>
      <h1 className={css.updateContactTitle}>Contact update page</h1>
      <UpdateForm />
      {status === 'updatedContact' && <Navigate to="/contacts" />}
      {error && (
        <p className={css.error}>Sorry, something went wrong: {error}</p>
      )}
    </>
  );
}
