import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { redirectProfile } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        redirectProfile ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;