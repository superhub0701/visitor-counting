import React, {useEffect, useState, useContext} from "react";
import TableContent from "../components/tableContent"
import {getQueue} from "../api"
import {Context} from '../app';

const Queue = () => {
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
    getQueue()
      .then(res => {
        setOccupy(res.data.data)
        let [queue_load, queue_alert] = res.data.setting.queue.split('/')
        setAlert(queue_alert * 1)
        setLoad(queue_load * 1)
        let _vacancy = (queue_load * 1 >= res.data.data * 1)? queue_load * 1 - res.data.data * 1 : 0;
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

export default Queue;
