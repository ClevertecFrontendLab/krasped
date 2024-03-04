import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { logout, selectToken, setToken } from "@redux/userSlice";
import { useLocalStorage } from "@hooks/useLocalStorage";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const [storageToken, setTok] = useLocalStorage("token", null);
  const token = useAppSelector(selectToken);

  const location = useLocation();
    const searchParams = new URLSearchParams(location?.state?.from);
    const searchToken = searchParams.get('accessToken');

  useEffect(() => {
    if ((!token && storageToken) || searchToken) {
      if(!!searchToken){
        setTok(searchToken)
      }
      dispatch(setToken(searchToken || storageToken))
    }
  }, [token, storageToken])

  if (token || storageToken || searchToken) {
    return children;
  } else {
    dispatch(logout())
    return <Navigate to="/auth/login" />;
  }

};

export default ProtectedRoute;