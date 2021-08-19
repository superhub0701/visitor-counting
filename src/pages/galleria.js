import React, {useEffect, useState, useContext} from "react";
// import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContent from "../components/tableContent"
import materialStyle from "../styles/material"
import {getGalleria} from "../api"
import {Context} from '../app';

const Galleria = () => {
  const {state, dispatch} = useContext(Context)
  const classes = materialStyle()
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({type: "change_page", data: 1})
    getData()
    const intervalFunc = setInterval(() => getData(), 3000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    setIsLoading(true)
    getGalleria()
      .then(res => {
        setIsLoading(false)
        setOccupy(res.data)
        setLoad(315)
        setVacancy(315 - res.data)
      }).catch(err => {
      setIsLoading(false)
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[1]}/>
      {isLoading ? <div className={classes.loading}>
        <CircularProgress size={100} color="secondary"/>
      </div> : null}
    </>
  )
};

export default Galleria;
