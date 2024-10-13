import { FC} from "react";
import { Navigate } from "react-router-dom";

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }) => {
  // const userIsLogged = useLoginStatus(); // Your hook to get login status
 
  

  if (!userIsLogged) {
     return <Navigate  to={`/auth/login?redirected=true&redirected_from=${location.pathname}`} replace={true}/>;
  }
  return children;
};


export default RequireAuth