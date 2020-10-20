import React, { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  isLoginUser: false,
  isLoginAdmin: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
     case "UPDATE_PP_SUCCESS":
      return {
        ...state,
        user: action.payload,
      }
    case "USER_LOADED":
      return{
        ...state,
        isLoginUser: true,
        user: action.payload,
        loading: false,
      }
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return{
        ...state,
        isLoginUser: false,
        isLoginAdmin: false,
        user: null,
        loading: false,
      }
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoginUser: true,
        isLoginAdmin: false,
        loading: false,
      };
    case "LOGIN_ADMIN":
      return {
        ...state,
        isLoginAdmin: true,
        isLoginUser: false,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoginUser: false,
        isLoginAdmin: false,
        user: null,
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
