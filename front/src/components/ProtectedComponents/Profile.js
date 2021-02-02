import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getRoute } from "../../helpers/apiFetcher";

const Profile = () => {
  const {
    logoutUser,
    authenticateUser,
    isAuthenticated,
    message,
    token,
    user,
  } = useContext(AuthContext);

  useEffect(() => {
    getRoute("/profile", token)
      .then((results) => authenticateUser(results.isTokenVerified))
      .catch((getError) =>
        console.error(`Error when running GET to api: ${getError}`)
      );
  }, [authenticateUser, token]);

  return isAuthenticated ? (
    <div>
      {message && message}
      <h2>
        Welcome {user.firstname} {user.lastname}
      </h2>
      <p>Incase you forgot, your email is {user.email}</p>
      <p>This your protected profile page</p>
      <Link to="/" onClick={logoutUser}>
        Log Out
      </Link>
    </div>
  ) : (
    <p>Authenticating user!</p>
  );
};

export default Profile;