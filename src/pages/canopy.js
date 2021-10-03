import React, {useEffect, useState, useContext} from "react";
import TableContent from "../components/tableContent"
import {getCanopy} from "../api"
import {Context} from '../app';

const Canopy = () => {
  const {state, dispatch} = useContext(Context)
  const [_alert, setAlert] = useState(0)
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)

  useEffect(() => {
    dispatch({type: "change_page", data: 2})
    getData()
    const intervalFunc = setInterval(() => getData(), 30000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    getCanopy()
      .then(res => {
        setOccupy(res.data.data)
        let [canopy_load, canopy_alert] = res.data.setting.canopy.split('/')
        setAlert(canopy_alert * 1)
        setLoad(canopy_load * 1)
        let _vacancy = (canopy_load * 1 >= res.data.data * 1)? canopy_load * 1 - res.data.data * 1 : 0;
        setVacancy(_vacancy)
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[2]} isWarning={occupy>_alert}/>
    </>
  )
};

export default Canopy;
