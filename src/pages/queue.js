import React, {useEffect, useState, useContext} from "react";
import TableContent from "../components/tableContent"
import {getQueue} from "../api"
import {Context} from '../app';
import {QueueLoad} from "../global";

const Queue = () => {
  const {state, dispatch} = useContext(Context)
  const [occupy, setOccupy] = useState(0)
  const [load, setLoad] = useState(0)
  const [vacancy, setVacancy] = useState(0)

  useEffect(() => {
    dispatch({type: "change_page", data: 4})
    getData()
    const intervalFunc = setInterval(() => getData(), 3000)

    return () => {
      clearInterval(intervalFunc)
    }
  }, [])

  const getData = () => {
    getQueue()
      .then(res => {
        setOccupy(res.data)
        setLoad(QueueLoad)
        setVacancy(QueueLoad - res.data)
      }).catch(err => {
      console.log('error: ', err.response)
      alert('Error found')
    })
  }

  return (
    <>
      <TableContent occupy={occupy} load={load} vacancy={vacancy} color={state.colors[4]} isWarning={occupy>50}/>
    </>
  )
};

export default Queue;
