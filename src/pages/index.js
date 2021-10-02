import React, {useState, useEffect} from "react";
import {Switch, Route, Redirect} from "react-router";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Menu from "../components/menu"
import Dashboard from "./main";
import Galleria from "./galleria";
import Canopy from "./canopy";
import City from "./city";
import Queue from "./queue";
import Market from "./market";
import Setting from "./setting";
import {logoutIcon, logoIcon} from "../components/image"

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
    }
  },
  logoutContainer: {position: 'absolute', top: 10, right: 0, zIndex: 1},
  arrow: {position: 'absolute', top: 30, right: 0, zIndex: 1, fontSize: 40},
  setting: {
    position: 'absolute', top: 70, right: 25, width: 100, zIndex: 1, fontSize: 20, textAlign: 'center', backgroundColor: '#2d2d2d', cursor: 'pointer',
    [theme.breakpoints.down(768)]: {top: 60, right: 20, width: 80}
  },
  logout_img: {
    width: 200,
    [theme.breakpoints.down(768)]: {
      width: 160,
    }
  },
  logo_img: {
    width: 200,
    height: 60, borderRadius: 8, cursor: 'pointer',
    [theme.breakpoints.down(768)]: {
      width: 160,
      height: 48,
    }
  },
  logoutContent: {
    position: 'absolute',
    right: 25,
    top: 12,
    width: 100,
    textAlign: 'center',
    wordBreak: 'break-all',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
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
  logoContainer: {
    height: 100,
    [theme.breakpoints.down(768)]: {height: 80}
  },
  title: {
    display: 'flex', alignItems: 'center',
    fontSize: 60, marginLeft: 16,
    [theme.breakpoints.down(1200)]: {display: 'none'},
    // [theme.breakpoints.between(768, 992)]: {
    //   height: 80, fontSize: 40
    // },
    // [theme.breakpoints.between(550, 768)]: {
    //   height: 80, fontSize: 32
    // },
    // [theme.breakpoints.down(550)]: {
    //   width: 'calc(100% - 140px)', height: 100, fontSize: 24
    // },
  }
}))

const RedirectComponent = () => {
  const history = useHistory()
  history.push('/main/dashboard')
  return (<></>)
}

const Main = () => {
  const User = JSON.parse(localStorage.getItem('visitor_counting_app_user'))
  const classes = useStyles()
  const history = useHistory()
  const [isArrowRight, setIsArrowRight] = useState(true)
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  const getFormatDate = (date) => {
    let result = addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ', ' + weekday[date.getDay()] + ', ' +
      date.getDate() + `${nth(date.getDate())} ` + month[date.getMonth()] + date.getFullYear();
    return result;
  }
  const [currentTime, setCurrentTime] = useState(getFormatDate(new Date()))

  useEffect(() => {
    const intervalFunc = setInterval(() => {
      setCurrentTime(getFormatDate(new Date()))
    }, 60000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  return (
    <div className={`container position-relative ${classes.container}`}>
      <div className={classes.logoutContainer}>
        <img className={classes.logout_img} src={logoutIcon} alt={'logout img'}/>
        <div className={classes.logoutContent} onClick={() => {
          localStorage.removeItem('visitor_counting_app_user')
          history.push('/auth/login')
        }}>
          <span className={classes.logout}>LOGOUT</span>
          <span className={classes.username}>{User.name.toUpperCase()}</span>
        </div>
      </div>
      {User.role === 'Admin' && isArrowRight ?
        <ArrowRight className={classes.arrow} onClick={() => setIsArrowRight(false)}/> : null}
      {User.role === 'Admin' && !isArrowRight ?
        <>
          <ArrowDropDown className={classes.arrow} onClick={() => setIsArrowRight(true)}/>
          <div className={classes.setting}>
            <div style={{backgroundColor: '#fff', height: 1}}></div>
            <div onClick={()=> {
              setIsArrowRight(true)
              history.push('/main/setting')
            }}>Setting</div>
          </div>
        </> : null}
      <div className={"row"}>
        <div className={`col-12 d-flex align-items-center ${classes.logoContainer}`}>
          <img className={classes.logo_img} src={logoIcon} alt={'logo img'}
               onClick={() => history.push('/main/dashboard')}/>
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
            <Route path={`/main/queue`}><Queue/></Route>
            <Route path={`/main/market`}><Market/></Route>
            <Route path={`/main/setting`}>
              {User && User.role === 'Admin' ? <Setting/> : <RedirectComponent/>}
            </Route>
            <Route path="/main">
              <Redirect to="/main/dashboard"/>
            </Route>
          </Switch>
        </div>
        <div className={"col-12 d-none d-sm-flex justify-content-end text-break"}
             style={{fontSize: 32, textShadow: '2px 3px 5px black'}}>
          {currentTime}
        </div>
      </div>
    </div>
  );
};

export default Main;
