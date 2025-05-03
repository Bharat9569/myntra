import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);
  const location = useLocation();

  if (isLoggedIn === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoggedIn === undefined) {
   
    return null;
  }

  return children;
}

export default ProtectedRoute;
