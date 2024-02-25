import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { selectToken } from "@redux/userSlice";
import { useAppSelector } from "@hooks/typed-react-redux-hooks";

export const AnonimRoute = ({ children }: PropsWithChildren) => {
  const token = useAppSelector(selectToken);

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AnonimRoute;