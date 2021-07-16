import React from "react";
import {Switch, Route, Redirect} from "react-router";
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./resetPassword";

const Auth = () => {

  return (
    <div className={"container"}>
      <div className={"row justify-content-center align-items-center"} style={{height: '100vh'}}>
        <Switch>
          <Route path={`/auth/login`}><Login/></Route>
          <Route path={`/auth/forgotPassword`}><ForgotPassword/></Route>
          {/*<Route path={`/auth/resetPassword/:id`}><ResetPassword/></Route>*/}
          <Route path="/auth">
            <Redirect to="/auth/login"/>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
