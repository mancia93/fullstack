import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AuthContextProvider from "./contexts/AuthContext";
import Login from "./components/Forms/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import Profile from "./components/ProtectedComponents/Profile";
import Registration from "./components/Forms/Registration/Registration";


const App = () => (
  <section className="App">
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Registration} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </AuthContextProvider>
  </section>
);


export default App;