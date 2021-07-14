import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import materialStyle from "../styles/material";
import {Context} from "../app";
import CircularProgress from "@material-ui/core/CircularProgress";
import {getDashboard} from "../api";

const useStyles = makeStyles(theme => ({
  container: props => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: props.bgClr,
    height: 'calc(100vh - 200px)',
    padding: 8,
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
    fontSize: 90
  },
  detail: {
    position: 'relative',
    flexGrow: 1,
    fontSize: 48,
    fontWeight: 'bold'
  },
  rightSideTitle: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: 32,
  },
  rightSideValue: {
    width: '50%',
    fontSize: 60,
  },
  up: {
    position: 'absolute',
    top: '10%',
    right: '45%',
  },
  down: {
    position: 'absolute',
    bottom: '10%',
    left: '45%',
  }
}))

const Dashboard = () => {
  const {state, dispatch} = useContext(Context)
  const classes = useStyles({bgClr: state.colors[0]})
  const classes1 = materialStyle()
  const [details, setDetails] = useState([])
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({type: "change_page", data: 0})
    getData()
    const intervalFunc = setInterval(() => getData(), 3000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    setIsLoading(true)
    getDashboard()
      .then(res => {
        setIsLoading(false)
        let data = []
        Object.entries(res.data).forEach(([key, value]) => {
          data.push(JSON.parse(value))
        });

        let occupy = 0, vacancy = 0
        data.map(d => {
          occupy += d.occupy
          vacancy += d.vacancy
        })

        setDetails(data)
        setOccupy(occupy)
        setLoad(occupy + vacancy)
        setVacancy(vacancy)
      }).catch(err => {
      setIsLoading(false)
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  const detailStyles = [
    {title: '#237350', top: '#00a15b', bottom: '#388866'},
    {title: '#96292c', top: '#e60b12', bottom: '#ab3e41'},
    {title: '#90563c', top: '#da6631', bottom: '#a56b51'},
    {title: '#6a2956', top: '#8f0b66', bottom: '#7f3e6b'},
  ]

  return (
    <div className={classes.container}>
      <div className={'d-flex'} style={{height: '60%'}}>
        <div className={'w-50 p-4 position-relative d-flex'}>
          <div style={{fontSize: 32}}>OCCUPANCIES:</div>
          <div className={classes.occupy}>
            {occupy}
          </div>
        </div>

        <div className={'w-50 p-4'}>
          <div className={'w-100'}>
            <div className={classes.rightSideTitle}>VACANCIES:</div>
            <div className={'d-flex justify-content-end'}>
              <div className={classes.rightSideValue}>
                {vacancy}
              </div>
            </div>
          </div>
          <div className={'w-100'}>
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
        {['GALLERIA', 'CANOPY WALK', 'CITY CONE', 'SKY MARKET'].map((data, i) => (
          <div className={'w-25 d-flex flex-column'} key={i}>
            <div className={'text-center'} style={{fontSize: 28, backgroundColor: detailStyles[i].title}}>{data}</div>
            <div className={classes.detail}
                 style={{backgroundImage: `linear-gradient(to top left, ${detailStyles[i].top} 50%, ${detailStyles[i].bottom} 50%)`}}
            >
              <span className={classes.up}>{details[i]?.occupy}</span>
              <span className={classes.down}>{details[i]?.vacancy}</span>
            </div>
          </div>
        ))}
      </div>
      {isLoading ? <div className={classes1.loading}>
        <CircularProgress size={100} color="secondary"/>
      </div> : null}
    </div>
  )
}

export default Dashboard;