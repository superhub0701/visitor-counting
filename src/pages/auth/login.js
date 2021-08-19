import React, {useState, useContext} from "react"
import {Link, useHistory} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import materialStyle from "../../styles/material"
import {auth} from "../../api"
import err_func from "../../auth-check";
import {Context} from '../../app';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: 60, textAlign: 'center', lineHeight: '60px', marginBottom: 32,
    [theme.breakpoints.down(576)]: {
      fontSize: 42, lineHeight: '40px', marginBottom: 16
    }
  },
  leftSide: {
    width: '25%', display: 'flex', justifyContent: 'flex-end', paddingRight: 16
  },
  input: {
    flexGrow: 1, height: 36, backgroundColor: '#1e4f8a', outline: "none"
  },
  button: {
    backgroundColor: '#518ee1', width: 150, color: 'white', fontFamily: 'Myriad', fontSize: 16
  }
}))

const Login = () => {
  const classes = useStyles()
  const classes1 = materialStyle()
  const history = useHistory()
  const {dispatch} = useContext(Context)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isRememberMe, setIsRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const onSubmit = () => {
    setIsLoading(true)

    let myDataObj = {type: 'login', userId, password, isRememberMe}
    let formData = new FormData();

    for (let key in myDataObj) {
      formData.append(key, myDataObj[key])
    }

    auth(formData)
      .then(res => {
        setIsLoading(false)
        let {type} = res.data

        if (type === 'success') {
          localStorage.setItem('visitor_counting_app_user', JSON.stringify(res.data.data))
          dispatch({type: "set_user", data: res.data.data})
          history.push('/main')
        }
        if(type === 'fail') {
          setIsFailed(true)
          setTimeout(() => {setIsFailed(false)}, 3000)
        }

      }).catch(err => {
      setIsLoading(false)
      alert('Error found')
    })
  }

  return (
    <>
      <div className={"justify-content-center align-items-center user-select-none"}>
        <div className={classes.title}>Visitors Counting System</div>
        <div className={'d-flex justify-content-center'}>
          <div className={"p-4 login"}>
            <h1 className={'mb-3'}>Login</h1>
            <div className={"d-flex mb-3"}>
              <div className={classes.leftSide}>UserId:</div>
              <input className={classes.input} type={'text'} value={userId}
                     onChange={(e) => setUserId(e.target.value)}/>
            </div>
            <div className={"d-flex mb-2"}>
              <div className={classes.leftSide}>Password</div>
              <input type={'password'} className={classes.input} value={password} minLength={8}
                     onChange={(e) => setPassword(e.target.value)} placeholder={'minimum 8 characters'}/>
            </div>
            <div className={"d-flex"}>
              <div className={classes.leftSide}></div>
              <div className={"d-flex flex-grow-1 justify-content-between"}>
                <label onClick={() => setIsRememberMe(!isRememberMe)}><input type={'checkbox'}
                                                                             value={isRememberMe}
                                                                             className={"mr-1"}/>Remember
                  Me</label>
                {/*<Link className={'flex-grow-1 d-flex justify-content-end text-light'}*/}
                {/*      to={'/auth/forgotPassword'}>Forgot Password?</Link>*/}
              </div>
            </div>
            {isFailed? <div className={'mb-1 text-center'} style={{color: 'purple'}}>Email or password is not valid.</div> : null}
            <div className={"d-flex"}>
              <div className={classes.leftSide}></div>
              <Button variant="contained" className={classes.button} onClick={onSubmit}
                      disabled={!(userId && password && password.length > 7)}>
                LOGIN
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? <div className={classes1.loading}>
        <CircularProgress size={100} color="secondary"/>
      </div> : null}
    </>
  )
}

export default Login;
