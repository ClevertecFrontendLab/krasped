import { Navigate } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { logout, selectToken, setToken } from "@redux/userSlice";
import { useLocalStorage } from "@hooks/useLocalStorage";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const [storageToken, setTok] = useLocalStorage("token", null);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (!token && storageToken) {
      dispatch(setToken(storageToken))
    }
  }, [token, storageToken])

  if (token || storageToken) {
    return children;
  } else {
    dispatch(logout())
    return <Navigate to="/auth/login" />;
  }

};

export default ProtectedRoute;