import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../app/slices/userSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const hasToken = !!localStorage.getItem('token');

  if (!isLoggedIn && !hasToken) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

export default ProtectedRoute;