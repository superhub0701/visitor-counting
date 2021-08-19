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
import {logoutIcon} from "../components/image"

const useStyles = makeStyles(theme=> ({
  container: {
    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
    }
  },
  logoutContainer: {position: 'absolute', top: 10, right: 0, zIndex: 1},
  img: {
    width: 200,
    [theme.breakpoints.down(768)]: {
      width: 160,
    }
  },
  logoutContent: {
    position: 'absolute', right: 25, top: 12, width: 100, textAlign: 'center', wordBreak: 'break-all', display: 'flex', flexDirection: 'column', cursor: 'pointer',
    [theme.breakpoints.down(768)]: {
      top: 10, right: 10
    }
  },
  logout: {
    fontSize: 22,
    [theme.breakpoints.down(768)]: {
      fontSize: 18
    }
  },
  username: {marginTop: -8},
  title: {
    display: 'flex', alignItems: 'center',
    height: 100, fontSize: 60,
    [theme.breakpoints.between(768, 992)]: {
      height: 80, fontSize: 40
    },
    [theme.breakpoints.between(550, 768)]: {
      height: 80, fontSize: 32
    },
    [theme.breakpoints.down(550)]: {
      width: 'calc(100% - 140px)', height: 100, fontSize: 24
    },
  }
}))

const Main = () => {
  const User = JSON.parse(localStorage.getItem('visitor_counting_app_user'))
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={`container position-relative ${classes.container}`}>
      <div className={classes.logoutContainer}>
        <img className={classes.img} src={logoutIcon} alt={'logout img'} />
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
