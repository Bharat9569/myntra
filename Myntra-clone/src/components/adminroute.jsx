
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function AdminRoute({ children }) {
  const { isLoggedIn, role } = useSelector(state => state.auth);
  const location = useLocation();

  if (!isLoggedIn || role !== 'admin') {
    
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AdminRoute;
