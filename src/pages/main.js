import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import materialStyle from "../styles/material";
import {Context} from "../app";
import {getDashboard} from "../api";
import {font1, font2, font3, font4, font5} from "../global";

const useStyles = makeStyles(theme => ({
  container: props => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: props.bgClr,
    height: 'calc(100vh - 200px)',
    // padding: 8,
    textShadow: '2px 3px 5px black',
    [theme.breakpoints.down(768)]: {
      overflow: 'scroll'
    }
  }),
  occupy: {
    position: 'absolute',
    top: 0, bottom: 0, right: 0, left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '20%',
    fontSize: font5
  },
  detail: {
    position: 'relative',
    flexGrow: 1,
    fontSize: font3,
    fontWeight: 'bold'
  },
  rightSideTitle: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: font2,
  },
  rightSideValue: {
    width: '50%',
    fontSize: font4,
  },
  up: {
    position: 'absolute',
    top: '10%',
    right: '55%',
    [theme.breakpoints.between(768, 992)]: {right: '45%'},
    [theme.breakpoints.down(768)]: {right: '65%'}
  },
  down: {
    position: 'absolute',
    bottom: '10%',
    left: '55%',
    [theme.breakpoints.between(768, 992)]: {left: '45%'},
    [theme.breakpoints.down(768)]: {left: '65%'}
  },
  text: {
    height: 50, fontSize: 28,
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    [theme.breakpoints.down(992)]: {
      fontSize: font1
    }
  },
  mobileValue: {
    display: 'flex', justifyContent: "flex-end", fontSize: font2
  }
}))

const Dashboard = () => {
  const {state, dispatch} = useContext(Context)
  const classes = useStyles({bgClr: state.colors[0]})
  // const classes1 = materialStyle()
  const matches = useMediaQuery('(max-width: 767.98px)');
  const [details, setDetails] = useState([])
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({type: "change_page", data: 0})
    getData()
    const intervalFunc = setInterval(() => getData(), 30000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    // setIsLoading(true)
    getDashboard()
      .then(res => {
        // setIsLoading(false)
        let {galleria, canopy, city, queue, market, setting} = res.data
        let [gal_l, gal_a] = setting.galleria.split('/')
        let [cnp_l, cnp_a] = setting.canopy.split('/')
        let [cty_l, cty_a] = setting.city.split('/')
        let [que_l, que_a] = setting.queue.split('/')
        let [mrk_l, mrk_a] = setting.sky.split('/')
        let TotalLoad = gal_l * 1 + cnp_l * 1 + cty_l * 1 + que_l * 1 + mrk_l * 1
        setLoad(TotalLoad)
        let total = galleria * 1 + canopy * 1 + city * 1 + queue * 1 + market * 1;
        setOccupy(total)
        let _vacancy = (TotalLoad >= total)? (TotalLoad - total) : 0;
        setVacancy(_vacancy)
        setDetails([
          {occupy: galleria, load: gal_l * 1, alert: gal_a * 1},
          {occupy: canopy, load: cnp_l * 1, alert: cnp_a * 1},
          {occupy: city, load: cty_l * 1, alert: cty_a * 1},
          {occupy: queue, load: que_l * 1, alert: que_a * 1},
          {occupy: market, load: mrk_l * 1, alert: mrk_a * 1},
        ])
      }).catch(err => {
      // setIsLoading(false)
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  const detailStyles = [
    {title: '#90563c', top: '#707070', bottom: '#ddbd0b', name: 'QUEUE'},
    {title: '#90563c', top: '#707070', bottom: '#f26522', name: 'CITY CONE'},
    {title: '#96292c', top: '#707070', bottom: '#ed145b', name: 'CANOPY WALK'},
    {title: '#6a2956', top: '#707070', bottom: '#92278f', name: 'SKY MARKET'},
    {title: '#237350', top: '#707070', bottom: '#00a651', name: 'GALLERIA'},
  ]

  return (
    <div className={classes.container}>
      {matches ?
        <div className={'p-2'}>
          <div style={{fontSize: font1}}>OCCUPANCIES:</div>
          <div className={classes.mobileValue}>{occupy}</div>
          <div style={{fontSize: font1}}>VACANCIES:</div>
          <div className={classes.mobileValue}>{vacancy}</div>
          <div style={{fontSize: font1}}>LOAD:</div>
          <div className={classes.mobileValue}>{load}</div>
          {detailStyles.map((data, i) => (
            <div className={'d-flex flex-column mt-3'} style={{height: 200}} key={i}>
              <div className={classes.text} style={{backgroundColor: '#464646'}}>{data.name}</div>
              <div className={classes.detail}
                   style={{backgroundImage: `linear-gradient(to top left, ${data.top} 50%, ${data.bottom} 50%)`}}
              >
                <span className={classes.up}>{details[i]?.occupy}</span>
                <span className={classes.down}>{details[i]?.load}</span>
              </div>
            </div>
          ))}
        </div> :
        <>
          <div className={'d-flex'} style={{height: '60%'}}>
            <div className={'w-50 p-4 position-relative d-flex'}>
              <div style={{fontSize: font2}}>OCCUPANCIES:</div>
              <div className={classes.occupy}>
                {occupy}
              </div>
            </div>

            <div className={'w-50 p-4'}>
              <div className={'w-100 h-50'}>
                <div className={classes.rightSideTitle}>VACANCIES:</div>
                <div className={'d-flex justify-content-end'}>
                  <div className={classes.rightSideValue}>
                    {vacancy}
                  </div>
                </div>
              </div>
              <div className={'w-100 h-50'}>
                <div className={classes.rightSideTitle}>LOAD:</div>
                <div className={'d-flex justify-content-end'}>
                  <div className={classes.rightSideValue}>
                    {load}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'d-flex flex-grow-1'}>
            {detailStyles.map((data, i) => {
              let isWarning = details[i]? details[i].occupy > details[i].alert : false;

              return (
                <div className={'d-flex flex-column'} style={{width: `${100 / detailStyles.length}%`}} key={i}>
                  <div className={classes.text} style={{backgroundColor: '#464646'}}>{data.name}</div>
                  <div className={classes.detail}
                       style={{backgroundImage: `linear-gradient(to top left, ${data.top} 50%, ${data.bottom} 50%)`}}
                  >
                    <span className={classes.up} style={{color: isWarning? 'red' : 'white'}}>{details[i]?.occupy}</span>
                    <span className={classes.down}>{details[i]?.load}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      }
      {/*{isLoading ? <div className={classes1.loading}>*/}
      {/*  <CircularProgress size={100} color="secondary"/>*/}
      {/*</div> : null}*/}
    </div>
  )
}

export default Dashboard;
