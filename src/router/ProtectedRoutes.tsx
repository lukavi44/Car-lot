import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  accessToken: string | null;
}

const ProtectedRoutes = ({ accessToken }: ProtectedRoutesProps) => {
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
