import React from "react";
import {Switch, Route, Redirect} from "react-router";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "../components/menu"
import Dashboard from "./main";
import Galleria from "./galleria";
import Canopy from "./canopy";
import City from "./city";
import Market from "./market";
import Logout from "../assets/img/logout.png"

const useStyles = makeStyles(theme=> ({
  logoutContainer: {position: 'absolute', top: 10, right: 0, zIndex: 1},
  logoutContent: {
    position: 'absolute', right: 25, top: 12, width: 100, textAlign: 'center', wordBreak: 'break-all', display: 'flex', flexDirection: 'column', cursor: 'pointer'
  },
  logout: {fontSize: 22},
  username: {marginTop: -8},
  title: {fontSize: 60}
}))

const Main = () => {
  const User = JSON.parse(localStorage.getItem('visitor_counting_app_user'))
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={"container position-relative"}>
      <div className={classes.logoutContainer}>
        <img src={Logout} alt={'logout img'} width={200} />
        <div className={classes.logoutContent} onClick={() => {
          localStorage.removeItem('visitor_counting_app_user')
          history.push('/auth/login')
        }}>
          <span className={classes.logout}>LOGOUT</span>
          <span className={classes.username}>{User.name}</span>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-12"}>
          <div className={classes.title}>Visitors Counting System</div>
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
