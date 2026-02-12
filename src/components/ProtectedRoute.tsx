import { Navigate } from 'react-router-dom';
import useAuthStore, { useAuthActions } from '../store/useAuthStore';


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuthStore();
  const { isTokenExpired } = useAuthActions();

  // Check if user has token and it's not expired
  if (!accessToken || isTokenExpired()) {
    console.log("Access token is missing or expired. Redirecting to login.");
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}