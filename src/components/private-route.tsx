import { isAuthenticate } from "@/services/session.service";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children: Component }: Props) => {
  return isAuthenticate() ? Component : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
