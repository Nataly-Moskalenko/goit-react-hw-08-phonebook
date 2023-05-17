import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthStatus } from 'redux/selectors';

export default function PrivateRoute({ children }) {
  const status = useSelector(selectAuthStatus);
  return status === 'isLoggedIn' ? children : <Navigate to="/login" />;
}
