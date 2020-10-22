import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { UserRoute, AdminRoute } from "./context/PrivateRoute";
import { Context } from "./context/Context";
import { API, setAuthToken } from "./config/api";
//pages
import Landing from "./pages/Landing";

//Admin
import HomeAdmin from "./pages/Admin/HomeAdmin";
import AdminAddLiterature from "./pages/Admin/AdminAddLiterature";
//users
import Home from "./pages/User/Home";
import SearchPage from "./pages/User/SearchPage";
import Profile from "./pages/User/Profile";
import AddLiterature from "./pages/User/AddLiterature";
import MyCollection from "./pages/User/MyCollection";
import Detail from "./components/Detail";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
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
        <AdminRoute exact path="/HomeAdmin" component={HomeAdmin} />
        <AdminRoute
          exact
          path="/AdminAddLiterature"
          component={AdminAddLiterature}
        />
        <Switch>
          <UserRoute exact path="/Home" component={Home} />
          <UserRoute exact path="/SearchPage" component={SearchPage} />
          <UserRoute exact path="/Profile" component={Profile} />
          <UserRoute exact path="/MyCollection" component={MyCollection} />
          <UserRoute exact path="/AddLiterature" component={AddLiterature} />
          <UserRoute exact path="/Detail/:id" component={Detail} />
        </Switch>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
