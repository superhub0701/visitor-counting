import React, {useEffect, useState, useContext, Fragment} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {setting} from "../api"
import {Context} from '../app';
import {font1, font2, font3, font4, font5} from "../global";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  container: props => ({
    display: 'flex', flexDirection: 'column', backgroundColor: props.bgClr,
    height: 'calc(100vh - 200px)', textShadow: '2px 3px 5px black',
    justifyContent: 'center', alignItems: 'center',
    [theme.breakpoints.down(768)]: {overflow: 'scroll'}
  }),
  box: {
    width: 640, fontSize: font2,
    [theme.breakpoints.down(768)]: {width: 320, fontSize: 22}
  },
  title: {
    width: 220, textAlign: 'center',
    [theme.breakpoints.down(768)]: {width: 90}
  },
  seperator: {height: 4, backgroundColor: '#fff'},
  name: {
    width: 200, textAlign: 'right',
    [theme.breakpoints.down(768)]: {width: 140}
  },
  input: {
    width: 100, height: 40, margin: '0 60px',
    [theme.breakpoints.down(768)]: {width: 80, margin: '0 5px'}
  },
  btnContainer: {
    width: 220, display: 'flex', justifyContent: 'flex-end',
    [theme.breakpoints.down(768)]: {width: 90}
  },
  checkbox: {
    width: 24, height: 24,
    [theme.breakpoints.down(768)]: {width: 20, height: 20}
  },
  btn: {
    backgroundColor: '#518ee1',
    height: 40,
    border: 0,
    borderRadius: 8,
    outline: 'none',
    fontSize: 20,
    color: '#fff',
    padding: '0 12px',
    '&:hover': {boxShadow: '2px 3px 5px black'},
    [theme.breakpoints.down(768)]: {fontSize: 16, padding: '0 8px'}
  }
}))

const CustomComponent = ({data, onChange, index}) => {
  const classes = useStyles()
  return (
    <div className={'d-flex align-items-center my-2'}>
      <div className={classes.name}>{data.name}</div>
      <input className={classes.input} type={'number'} value={data.load} min={1}
             onChange={(e) => onChange('load', e.target.value, index)}/>
      <input className={classes.input} type={'number'} value={data.alert} min={1}
             onChange={(e) => onChange('alert', e.target.value, index)}/>
    </div>
  )
}

const Setting = () => {
  const {state, dispatch} = useContext(Context)
  const history = useHistory()
  const matches = useMediaQuery('(max-width: 767.98px)');
  const classes = useStyles({bgClr: state.colors[6]})
  const [places, setPlaces] = useState([
    {name: 'Galleria:', load: 0, alert: 0},
    {name: 'Canopy Walk:', load: 0, alert: 0},
    {name: 'City Cone:', load: 0, alert: 0},
    {name: 'Queue:', load: 0, alert: 0},
    {name: 'Sky Market:', load: 0, alert: 0},
  ])
  const [main, setMain] = useState({load: 0, alert: 0})
  const [isReset, setIsReset] = useState(false)

  useEffect(() => {
    let data = new FormData();
    data.append("type", 'getsetting');
    setting(data)
      .then(res => {
        if ((res.data.type) === 'success') {
          let {canopy, city, queue, sky, galleria} = res.data.data
          let _galleria = galleria.split('/')
          let _canopy = canopy.split('/')
          let _city = city.split('/')
          let _queue = queue.split('/')
          let _sky = sky.split('/')
          setPlaces([
            {name: 'Galleria:', load: _galleria[0], alert: _galleria[1]},
            {name: 'Canopy Walk:', load: _canopy[0], alert: _canopy[1]},
            {name: 'City Cone:', load: _city[0], alert: _city[1]},
            {name: 'Queue:', load: _queue[0], alert: _queue[1]},
            {name: 'Sky Market:', load: _sky[0], alert: _sky[1]},
          ])
          setMain({
            load: _galleria[0] * 1 + _canopy[0] * 1 + _city[0] * 1 + _queue[0] * 1 + _sky[0] * 1,
            alert: _galleria[1] * 1 + _canopy[1] * 1 + _city[1] * 1 + _queue[1] * 1 + _sky[1] * 1,
          })
        } else {
          console.log('error: ', res.data.data)
        }
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }, [])

  const onChange = (type, val, i) => {
    if (val * 1 > 0) {
      let temp = [...places]
      temp[i][type] = val
      setPlaces(temp)
      let load = 0, alert = 0
      temp.map(x => {
        load += x.load * 1;
        alert += x.alert * 1
      })
      setMain({load, alert})
    }
  }

  const onSubmit = () => {
    let myDataObj = {places: JSON.stringify(places), isReset: isReset ? 1 : 0, type: 'setting'}
    let formData = new FormData();
    for (let key in myDataObj) {
      formData.append(key, myDataObj[key])
    }
    setting(formData)
      .then(res => {
        if (res.data.type === 'success') {
          alert('Submit successfully')
          history.push('/main/dashboard')
        }
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.box}>
          <div className={'d-flex'}>
            <div className={classes.name}></div>
            <span className={classes.title}>
              <span>LOAD</span>
            </span>
            <div className={classes.title}>
              <span>{matches ? "ALERT" : "ALERT VALUES"}</span>
            </div>
          </div>
          <div className={'d-flex mb-2'}>
            <div className={classes.name}>MAIN:</div>
            <span className={classes.title}>{main.load}</span>
            <span className={classes.title}>{main.alert}</span>
          </div>
          <div className={classes.seperator}></div>
          {places.map((place, i) =>
            <Fragment key={i}>
              <CustomComponent data={place} onChange={onChange} index={i}/>
            </Fragment>)}
          <div className={classes.seperator}></div>
          <div className={'d-flex align-items-center mt-2'}>
            <div className={classes.name}>Reset Time</div>
            <div className={classes.input} style={{height: matches ? 24 : 40, textAlign: matches ? 'center' : 'start'}}>
              <input className={classes.checkbox} type={'checkbox'} value={isReset}
                     onChange={() => setIsReset(!isReset)}/>
            </div>
            <div className={classes.btnContainer}>
              <button className={classes.btn} onClick={onSubmit}>CONFIRM</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Setting;
