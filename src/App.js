import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import { UserRoute, AdminRoute } from "./context/PrivateRoute";
import { Context } from "./context/Context";
import {API,setAuthToken} from "./config/api"
//pages
import Landing from "./pages/Landing";

//users
import NavbarUser from "./components/NavbarUser";
import Home from "./pages/User/Home";
import Profile from "./pages/User/Profile";
import AddLiterature from "./pages/User/AddLiterature";
import MyCollection from "./pages/User/MyCollection";
import Detail from "./components/Detail";
if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  const [state,dispatch] = useContext(Context)
  useEffect(() => {    
    const loadUser = async () =>{
      try {
        const res = await API.get('/auth');

        if(res.data.data.user.isAdmin){          
          dispatch({
          type: "LOGIN_ADMIN",
          payload: res.data.data.user,
        })}else{
          dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        })}        
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        })
      }
    }

    loadUser();           
  }, [])
  return (
    <BrowserRouter>
      <switch>
        <div style={{backgroundColor:"#161616",marginBottom:"-30px"}}>
          <Route exact path="/" component={Landing} />
          <div style={{padding:"59px 78px 0px 78px"}}>
            <UserRoute component={NavbarUser} />
            <div style={{marginTop:"30px"}}>
              <UserRoute exact path="/Home" component={Home} />
              <UserRoute exact path="/Profile" component={Profile} />
              <UserRoute exact path="/MyCollection" component={MyCollection} />
              <UserRoute exact path="/AddLiterature" component={AddLiterature} />
              <UserRoute exact path="/Detail/:id" component={Detail} />
            </div>
          </div>
        </div>
      </switch>
    </BrowserRouter>
  );
}

export default App;
