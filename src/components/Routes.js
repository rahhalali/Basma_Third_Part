import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import List from "../pages/List";
import Graph from "../pages/Graph";
import Login from "../pages/Login";
import SessionContext from "../context/SessionContext";

export default function Routes() {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);
  return (
    <>
      <Switch>
        <LoginRoute
          path="/login"
          component={Login}
          exact
          access_token={access_token}
        />
        <PrivateRoute
          path="/"
          exact
          component={List}
          access_token={access_token}
        />
        <PrivateRoute
          path="/chart"
          exact
          component={Graph}
          access_token={access_token}
        />
      </Switch>
    </>
  );
}
function LoginRoute({ path, component: Component, access_token, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) =>
        access_token ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

function PrivateRoute({ path, component: Component, access_token, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) =>
        access_token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
