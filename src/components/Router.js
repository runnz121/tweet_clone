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

const AppRouter = ({ isLoggedIn }) => {
  return (
    //&&의미  : isloggedin이 true여야 <navitagion>이 존재한다
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          //더 많은 라우트를 추가하기 위한 frament<>
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" /> 
          </>
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
