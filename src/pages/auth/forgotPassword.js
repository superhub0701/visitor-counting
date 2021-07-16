import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {auth} from "../../api";
import err_func from "../../auth-check";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {width: 500, padding: 48, backgroundColor: '#0072bc', borderRadius: 8},
  input: {width: '100%', height: 50, marginBottom: 24, marginTop: 24, outline: 'none', border: 0, fontSize: 20},
  button: {backgroundColor: '#518ee1', width: '100%', color: 'white', fontFamily: 'Myriad', fontSize: 16, height: 50}
}))

const ForgotPassword = () => {
  const history = useHistory()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [msg, setMsg] = useState('')
  const [flag, setFlag] = useState(false)

  const onSubmit = () => {
    let formData = new FormData();
    formData.append('type', 'forgotpassword')
    formData.append('email', email)

    auth(formData)
      .then(res => {
        setFlag(true)
        setTimeout(() => setFlag(false), 5000)
        if(res.data?.msg === 'success')
          setMsg('We sent the link for resetting password to you. Please check your email.')
        else if(res.data?.msg === "fail" && "This email doesn't exist") setMsg("This email doesn't exist")
        else setMsg("Failed to send email to you")
      }).catch(err => {
      err_func(err, history)
    })
  }

  const onChangeInput = (e) => {
    let email = e.target.value
    setEmail(email)
    if (/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email))
      setIsValid(false)
    else setIsValid(true)
  }

  return (
    <div className={classes.container}>
      <h3>Email Address</h3>
      <input value={email} onChange={onChangeInput} className={classes.input}/>
      <Button variant="contained" className={classes.button} onClick={onSubmit} disabled={isValid}>
        Submit
      </Button>
      {flag? <div className={'mt-4'}>
        {msg}
      </div> : null}
    </div>
  )
}

export default ForgotPassword;
