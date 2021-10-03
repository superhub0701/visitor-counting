import React, {useEffect, useState, useContext} from "react";
import TableContent from "../components/tableContent"
import {getMarket} from "../api"
import {Context} from '../app';

const Market = () => {
  const {state, dispatch} = useContext(Context)
  const [_alert, setAlert] = useState(0)
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)

  useEffect(() => {
    dispatch({type: "change_page", data: 5})
    getData()
    const intervalFunc = setInterval(() => getData(), 30000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    getMarket()
      .then(res => {
        setOccupy(res.data.data)
        let [market_load, market_alert] = res.data.setting.sky.split('/')
        setAlert(market_alert * 1)
        setLoad(market_load * 1)
        let _vacancy = (market_load * 1 >= res.data.data * 1)? market_load * 1 - res.data.data * 1 : 0;
        setVacancy(_vacancy)
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[5]} isWarning={occupy>_alert}/>
    </>
  )
};

export default Market;
