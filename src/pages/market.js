import React, {useEffect, useState, useContext} from "react";
// import CircularProgress from '@material-ui/core/CircularProgress';
import TableContent from "../components/tableContent"
// import materialStyle from "../styles/material"
import {getMarket} from "../api"
import {Context} from '../app';
import {MarketLoad} from "../global";

const Market = () => {
  const {state, dispatch} = useContext(Context)
  // const classes = materialStyle()
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({type: "change_page", data: 5})
    getData()
    const intervalFunc = setInterval(() => getData(), 3000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    // setIsLoading(true)
    getMarket()
      .then(res => {
        // setIsLoading(false)
        setOccupy(res.data)
        setLoad(MarketLoad)
        setVacancy(MarketLoad - res.data)
      }).catch(err => {
      // setIsLoading(false)
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[5]} isWarning={occupy>120}/>
      {/*{isLoading ? <div className={classes.loading}>*/}
      {/*  <CircularProgress size={100} color="secondary"/>*/}
      {/*</div> : null}*/}
    </>
  )
};

export default Market;
