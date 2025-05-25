import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router';

export const ProtectedRoute = () => {
  const [cookies] = useCookies(['token']);
  const location = useLocation();

  const isAuthenticated = !!cookies.token;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
