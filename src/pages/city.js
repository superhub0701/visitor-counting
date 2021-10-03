import React, {useEffect, useState, useContext} from "react";
import TableContent from "../components/tableContent"
import {getCity} from "../api"
import {Context} from '../app';

const City = () => {
  const {state, dispatch} = useContext(Context)
  const [_alert, setAlert] = useState(0)
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)

  useEffect(() => {
    dispatch({type: "change_page", data: 3})
    getData()
    const intervalFunc = setInterval(() => getData(), 30000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    getCity()
      .then(res => {
        setOccupy(res.data.data)
        let [city_load, city_alert] = res.data.setting.city.split('/')
        setAlert(city_alert * 1)
        setLoad(city_load * 1)
        let _vacancy = (city_load * 1 >= res.data.data * 1)? city_load * 1 - res.data.data * 1 : 0;
        setVacancy(_vacancy)
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[3]} isWarning={occupy>_alert}/>
    </>
  )
};

export default City;
