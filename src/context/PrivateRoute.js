import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./Context";

export const UserRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);
  return (    
    <Route
      {...rest}
      render={(props) =>
        state.loading? (
          <h1>LOADING...</h1>
        ) : state.isLoginUser? (
          <Component {...props} /> 
        ): (
          <Redirect to="/" />
        )
      }
    />
  );
};
export const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading? (
          <h1>LOADING...</h1>
        ) : state.isLoginAdmin ? (
          <Component {...props} /> 
        ): (
          <Redirect to="/" />
        )        
      }
    />
  );
};
