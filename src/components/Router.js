import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
//router의 userObj는 App.js에서 받는다 그리고 그것을
//home.js의 userObj로 넘겨준다
const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    //&&의미  : isloggedin이 true여야 <navitagion>이 존재한다
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
             <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >        
          
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser ={refreshUser}/>
            </Route>
            <Redirect from="*" to="/" />
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
          //redirect : from 에서 to 로 리다이렉트
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
