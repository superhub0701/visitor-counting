import React, {useEffect, useState, useContext} from "react";
import TableContent from "../components/tableContent"
import {getGalleria} from "../api"
import {Context} from '../app';

const Galleria = () => {
  const {state, dispatch} = useContext(Context)
  const [_alert, setAlert] = useState(0)
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)

  useEffect(() => {
    dispatch({type: "change_page", data: 1})
    getData()
    const intervalFunc = setInterval(() => getData(), 30000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    getGalleria()
      .then(res => {
        setOccupy(res.data.data)
        let [galleria_load, galleria_alert] = res.data.setting.galleria.split('/')
        setAlert(galleria_alert * 1)
        setLoad(galleria_load * 1)
        let _vacancy = (galleria_load * 1 >= res.data.data * 1)? galleria_load * 1 - res.data.data * 1 : 0;
        setVacancy(_vacancy)
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[1]} isWarning={occupy>_alert}/>
    </>
  )
};

export default Galleria;
