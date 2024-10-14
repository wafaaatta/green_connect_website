import { FC} from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  const {user} = useAppSelector((state) => state.auth_store); // Your hook to get login status
 
  

  if (!user) {
     return <Navigate  to={`/auth/login?redirected=true&redirected_from=${location.pathname}`} replace={true}/>;
  }
  return children;
};


export default RequireAuth