import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isUser: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({
  isUser,
  redirectPath = '/',
}: ProtectedRouteProps) => {
  if (!isUser) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
