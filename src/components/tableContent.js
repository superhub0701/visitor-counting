import React from "react"
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: props => ({
    backgroundColor: props.bgClr,
    width: '100%',
    height: 'calc(100vh - 200px)',
    padding: 8,
    opacity: 0.95
  }),
  table: {
    width: '100%',
    height: '100%'
  },
  style1: {
    height: 40, backgroundColor: '#4c434c'
  },
  style2: {
    fontSize: 32,
    width: '50%',
    textAlign: 'center'
  },
  style3: {
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
    fontSize: 32,
    backgroundColor: '#4c434c',
    textAlign: 'center'
  }
}))

const TableContent = ({occupy, load, vacancy, color}) => {
  const classes = useStyles({bgClr: color})

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
        <tr className={classes.style1}>
          <td className={classes.style2}>OCCUPANCIES</td>
          <td className={classes.style2}>VACANCIES</td>
        </tr>
        <tr>
          <td style={{fontSize: 60, textAlign: 'center'}}>{occupy}</td>
          <td className={"d-flex flex-column h-100 border-0 p-0"}>
            <div className={"d-flex justify-content-center align-items-center"}
                 style={{height: 'calc(50% - 25px)', fontSize: 60}}>{vacancy}</div>
            <div className={classes.style3}>Load</div>
            <div className={"d-flex justify-content-center align-items-center flex-grow-1"}
                 style={{fontSize: 60}}>{load}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableContent;
