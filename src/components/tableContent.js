import React from "react"
import {makeStyles} from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {font1, font2, font3, font4, font5} from "../global";

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
    fontSize: font2,
    width: '50%',
    textAlign: 'center',
    [theme.breakpoints.down(768)]: {width: '100%'}
  },
  style3: {
    borderTop: '2px solid white',
    borderBottom: '2px solid white',
    fontSize: font2,
    backgroundColor: '#4c434c',
    textAlign: 'center'
  },
  mobileValue: {
    fontSize: font3, textAlign: 'center'
  }
}))

const TableContent = ({occupy, load, vacancy, color}) => {
  const classes = useStyles({bgClr: color})
  const matches = useMediaQuery('(max-width: 767.98px)');

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
        {matches ?
          <>
            <tr className={classes.style1}><td className={classes.style2}>OCCUPANCIES</td></tr>
            <tr><td className={classes.mobileValue}>{occupy}</td></tr>
            <tr className={classes.style1}><td className={classes.style2}>VACANCIES</td></tr>
            <tr><td className={classes.mobileValue}>{vacancy}</td></tr>
            <tr className={classes.style1}><td className={classes.style2}>Load</td></tr>
            <tr><td className={classes.mobileValue}>{load}</td></tr>
          </> :
          <>
            <tr className={classes.style1}>
              <td className={classes.style2}>OCCUPANCIES</td>
              <td className={classes.style2}>VACANCIES</td>
            </tr>
            <tr>
              <td style={{fontSize: font5, textAlign: 'center'}}>{occupy}</td>
              <td className={"d-flex flex-column h-100 border-0 p-0"}>
                <div className={"d-flex justify-content-center align-items-center"}
                     style={{height: 'calc(50% - 25px)', fontSize: font4}}>{vacancy}</div>
                <div className={classes.style3}>Load</div>
                <div className={"d-flex justify-content-center align-items-center flex-grow-1"}
                     style={{fontSize: font4}}>{load}</div>
              </td>
            </tr>
          </>
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableContent;
