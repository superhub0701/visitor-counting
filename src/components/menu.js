import React, {useContext} from "react"
import {useHistory} from "react-router-dom"
import {styled, withTheme, useTheme} from '@material-ui/core/styles'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Context} from '../app';
import {DashboardIcon, WalkIcon, MarketIcon, GalleryIcon, ConeIcon, QueueIcon} from './image'

const MyLink = styled(withTheme(({color, ...other}) => <div {...other} />))(props => ({
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
  textShadow: '2px 3px 5px black',
  [props.theme.breakpoints.between(992, 1200)]: {marginLeft: 0},
  [props.theme.breakpoints.down(992)]: {
    display: 'none',
    textShadow: 'none'
  },
  marginLeft: 8,
}))

const SettingTitle = styled(withTheme(({...other}) => <span {...other} />))(props => ({
  display: 'block',
  textShadow: '2px 3px 5px black',
}))

const fields = [
  {to: 'dashboard', title: 'Main', color: '#b3d5eb'},
  {to: 'galleria', title: 'Galleria', color: '#b4e1ca'},
  {to: 'canopy', title: 'Canopy Walk', color: '#f3b9cc'},
  {to: 'city', title: 'City Cone', color: '#f5cfbd'},
  {to: 'queue', title: 'Queue', color: '#f5cfbd'},
  {to: 'market', title: 'Sky Market', color: '#dbbeda'},
]

const Menu = () => {
  const {state} = useContext(Context)
  const history = useHistory()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.between(992, 1200));
  const path = window.location.href.split('#')[1];

  const onClick = (i) => {
    history.push(`/main/${fields[i].to}`)
  }

  return (
    <div className={"d-flex"} style={{height: 40}}>
      {path === '/main/setting' ?
        <MyLink color={'#646464'} onClick={() => {}}>
          <SettingTitle>Load & Alert</SettingTitle>
        </MyLink> :
        fields.map((field, i) => {
          let to = field.to;
          return (
            <MyLink color={state.pageBgClr[i] ? state.colors[i] : '#c3c2bf'} key={i}
                    onClick={() => onClick(i)}>
              {matches ? null :
                <>
                  {to === 'dashboard' ? <DashboardIcon fill={'#fff'} width={24} height={18}/> : null}
                  {to === 'galleria' ? <GalleryIcon fill={'#fff'} width={18} height={18}/> : null}
                  {to === 'canopy' ? <WalkIcon fill={'#fff'} width={18} height={18}/> : null}
                  {to === 'city' ? <ConeIcon fill={'#fff'} width={18} height={18}/> : null}
                  {to === 'queue' ? <QueueIcon fill={'#fff'} width={18} height={18}/> : null}
                  {to === 'market' ? <MarketIcon fill={'#fff'} width={18} height={18}/> : null}
                </>}
              <Title>{field.title}</Title>
            </MyLink>
          )
        })
      }

    </div>
  )
}

export default Menu;
