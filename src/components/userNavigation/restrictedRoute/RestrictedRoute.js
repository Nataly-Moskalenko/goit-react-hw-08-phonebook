import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthStatus } from 'redux/selectors';

export default function RestrictedRoute({ children }) {
  const status = useSelector(selectAuthStatus);
  return status === 'isLoggedIn' ? <Navigate to="/contacts" /> : children;
}
