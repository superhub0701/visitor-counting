import React from "react";
import {Switch, Route, Redirect} from "react-router";
import Menu from "../components/menu"
import Dashboard from "./main";
import Galleria from "./galleria";
import Canopy from "./canopy";
import City from "./city";
import Market from "./market";

const Main = () => {

  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className={"col-12"}>
          <div style={{fontSize: 60}}>Visitors Counting System</div>
        </div>
        <div className={"col-12"}>
          <Menu/>
        </div>
        <div className={"col-12"}>
          <Switch>
            <Route path={`/main/dashboard`}><Dashboard/></Route>
            <Route path={`/main/galleria`}><Galleria/></Route>
            <Route path={`/main/canopy`}><Canopy/></Route>
            <Route path={`/main/city`}><City/></Route>
            <Route path={`/main/market`}><Market/></Route>
            <Route path="/main">
              <Redirect to="/main/dashboard"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Main;
