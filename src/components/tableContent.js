import React from "react"
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  table: props => ({
    backgroundColor: props.bgClr,
    width: '100%',
    height: 'calc(100vh - 200px)'
  })
}))

const TableContent = ({occupy, load, vacancy, color}) => {
  const classes = useStyles({bgClr: color})

  return (
    <table className={classes.table}>
      <tbody>
      <tr>
        <td>occupancies</td>
        <td>vacancies</td>
      </tr>
      <tr>
        <td>{occupy}</td>
        <td className={"d-flex flex-column"}>
          <div className={"d-flex justify-content-center align-items-center"}>{vacancy}</div>
          <div>Load</div>
          <div className={"d-flex justify-content-center align-items-center"}>{load}</div>
        </td>
      </tr>
      </tbody>
    </table>
  )
}

export default TableContent;
