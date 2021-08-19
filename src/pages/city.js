import React, {useEffect, useState, useContext} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContent from "../components/tableContent"
import materialStyle from "../styles/material"
import {getCity} from "../api"
import {Context} from '../app';

const City = () => {
  const {state, dispatch} = useContext(Context)
  const classes = materialStyle()
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({type: "change_page", data: 3})
    getData()
    const intervalFunc = setInterval(() => getData(), 3000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    // setIsLoading(true)
    getCity()
      .then(res => {
        // setIsLoading(false)
        setOccupy(res.data)
        setLoad(75)
        setVacancy(75 - res.data)
      }).catch(err => {
      // setIsLoading(false)
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[3]}/>
      {/*{isLoading ? <div className={classes.loading}>*/}
      {/*  <CircularProgress size={100} color="secondary"/>*/}
      {/*</div> : null}*/}
    </>
  )
};

export default City;
