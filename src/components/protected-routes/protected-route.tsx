import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";
import { selectToken } from "@redux/userSlice";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const token = useAppSelector(selectToken);


  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;