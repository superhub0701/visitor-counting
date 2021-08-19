import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import { styled, withTheme } from '@material-ui/core/styles'
import {Context} from '../app';
import {DashboardIcon, WalkIcon, MarketIcon, GalleryIcon, ConeIcon} from './image'

const MyLink = styled(withTheme(({ color, ...other }) => <div {...other} />))(props => ({
  background: props.color,
  padding: '0 24px',
  marginRight: 4,
  fontSize: 24,
  fontWeight: "bold",
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  [props.theme.breakpoints.down(500)]: {
    padding: '0 16px'
  },
}))

const Title = styled(withTheme(({...other}) => <span {...other} />))(props => ({
  display: 'block',
  [props.theme.breakpoints.down(992)]: {
    display: 'none',
  },
  marginLeft: 8,
}))

const fields = [
  { to: 'dashboard', title: 'Main', color: '#b3d5eb' },
  { to: 'galleria', title: 'Galleria', color: '#b4e1ca' },
  { to: 'canopy', title: 'Canopy Walk', color: '#f3b9cc' },
  { to: 'city', title: 'City Cone', color: '#f5cfbd' },
  { to: 'market', title: 'Sky Market', color: '#dbbeda' },
]

const Menu = () => {
  const {state} = useContext(Context)
  const history = useHistory()

  const onClick = (i) => {
    history.push(`/main/${fields[i].to}`)
  }

  return (
    <div className={"d-flex"} style={{height: 40}}>
      {fields.map((field, i) => {
        let to = field.to;
        return (
          <MyLink color={state.pageBgClr[i] ? state.colors[i] : field.color} key={i}
                  onClick={() => onClick(i)}>
            {to==='dashboard'? <DashboardIcon fill={'#fff'} width={24} height={18}/> : null}
            {to==='galleria'? <GalleryIcon fill={'#fff'} width={18} height={18}/> : null}
            {to==='canopy'? <WalkIcon fill={'#fff'} width={18} height={18}/> : null}
            {to==='city'? <ConeIcon fill={'#fff'} width={18} height={18}/> : null}
            {to==='market'? <MarketIcon fill={'#fff'} width={18} height={18}/> : null}
            <Title>{field.title}</Title>
          </MyLink>
        )
      })}
    </div>
  )
}

export default Menu;
