import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthStatus } from 'redux/selectors';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children }) {
  const status = useSelector(selectAuthStatus);
  return status === 'isLoggedIn' ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,  
};
