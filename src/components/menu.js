import React, {useContext} from "react"
import {Link, useHistory} from "react-router-dom"
import { styled } from '@material-ui/core/styles'
import {Context} from '../app';

const MyLink = styled(({ color, ...other }) => <div {...other} />)({
  background: (props) => props.color,
  padding: '0 32px',
  marginRight: 4,
  fontSize: 24,
  fontWeight: "bold",
  cursor: 'pointer'
})

const fields = [
  { to: 'dashboard', title: 'Main', color: '#b3d5eb' },
  { to: 'galleria', title: 'Galleria', color: '#b4e1ca' },
  { to: 'canopy', title: 'Canopy Walk', color: '#f3b9cc' },
  { to: 'city', title: 'City Cone', color: '#f5cfbd' },
  { to: 'market', title: 'Sky Market', color: '#dbbeda' },
]

const Menu = () => {
  const {state, dispatch} = useContext(Context)
  const history = useHistory()

  const onClick = (i) => {
    dispatch({type: "change_page", data: i});
    history.push(`/main/${fields[i].to}`)
  }

  return (
    <div className={"d-flex"}>
      {fields.map((field, i) => (
        <MyLink color={state.pageBgClr[i]? state.colors[i] : field.color} key={i}
                onClick={() => onClick(i)}>
          {field.title}
        </MyLink>
      ))}
    </div>
  )
}

export default Menu;
