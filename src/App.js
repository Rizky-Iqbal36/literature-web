import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { userContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import { AdminRoute, UserRoute } from "./context/privateRoute";
import "./App.css";
//pages
import Landing from "./pages/Landing";
//User
import Home from "./pages/user/Home/Home";
import Detail from "./pages/user/Detail/Detail";
import Profile from "./pages/user/Profile/Profile";
import SearchPage from "./pages/user/searchPage/SearchPage";
import MyCollection from "./pages/user/MyCollection/MyCollection";
import UserAddLiterature from "./pages/user/UserAddLiterature/UserAddLiterature";

//Admin
import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin";
import AdminAddLiterature from "./pages/admin/AdminAddLiterature/AdminAddLiterature";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(userContext);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth");
        if (res.data.data.user.isAdmin) {
          dispatch({
            type: "LOGIN_ADMIN",
            payload: res.data.data.user,
          });
        }
        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
    loadUser();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <UserRoute exact path="/Home" component={Home} />
        <UserRoute exact path="/Profile" component={Profile} />
        <UserRoute exact path="/Detail/:id" component={Detail} />
        <UserRoute exact path="/SearchPage" component={SearchPage} />
        <UserRoute exact path="/MyCollection" component={MyCollection} />
        <UserRoute
          exact
          path="/UserAddLiterature"
          component={UserAddLiterature}
        />
        <AdminRoute exact path="/HomeAdmin" component={HomeAdmin} />
        <AdminRoute
          exact
          path="/AdminAddLiterature"
          component={AdminAddLiterature}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
