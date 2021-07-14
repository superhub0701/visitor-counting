import React, {useEffect, useState, useContext} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContent from "../components/tableContent"
import materialStyle from "../styles/material"
import {getCity} from "../api"
import {Context} from '../app';

const City = () => {
  const {state} = useContext(Context)
  const classes = materialStyle()
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getData()
    const intervalFunc = setInterval(() => getData(), 3000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    setIsLoading(true)
    getCity()
      .then(res => {
        setIsLoading(false)
        let {occupy, vacancy} = res.data
        setOccupy(occupy)
        setLoad(occupy + vacancy)
        setVacancy(vacancy)
      }).catch(err => {
      setIsLoading(false)
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[3]}/>
      {isLoading ? <div className={classes.loading}>
        <CircularProgress size={100} color="secondary"/>
      </div> : null}
    </>
  )
};

export default City;
