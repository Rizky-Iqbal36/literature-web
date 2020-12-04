import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { userContext } from "./userContext";
import { PageLoading } from "../components/Loading";
export const UserRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(userContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <div style={{ backgroundColor: "#161616" }}>
            <PageLoading />
          </div>
        ) : state.isLoginUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(userContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <div style={{ backgroundColor: "#161616" }}>
            <PageLoading />
          </div>
        ) : state.isLoginAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
