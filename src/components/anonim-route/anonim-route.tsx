import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { selectToken } from "@redux/userSlice";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { _Main } from "@config/constants";

export const AnonimRoute = ({ children }: PropsWithChildren) => {
  const [storageToken, setTok] = useLocalStorage("token", null);
  const token = useAppSelector(selectToken);
  if (token || storageToken) {
    return <Navigate to={_Main} />;
  }
  return children;
};

export default AnonimRoute;