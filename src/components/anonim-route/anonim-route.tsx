import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { selectToken } from "@redux/userSlice";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { useLocalStorage } from "@hooks/useLocalStorage";

export const AnonimRoute = ({ children }: PropsWithChildren) => {
  const [storageToken, setTok] = useLocalStorage("token", null);
  const token = useAppSelector(selectToken);
  if (token || storageToken) {
    return <Navigate to="/main" />;
  }
  return children;
};

export default AnonimRoute;