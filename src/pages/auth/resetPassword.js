import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {auth} from "../../api";
import err_func from "../../auth-check";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {width: 500, padding: 48, backgroundColor: '#0072bc', borderRadius: 8},
  input: {width: '100%', height: 50, marginBottom: 24, marginTop: 24, outline: 'none', border: 0, fontSize: 20},
  button: {backgroundColor: '#518ee1', width: '100%', color: 'white', fontFamily: 'Myriad', fontSize: 16, height: 50}
}))

const ResetPassword = () => {
  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [msg, setMsg] = useState('')
  const [flag, setFlag] = useState(false)

  const onSubmit = () => {
    let formData = new FormData();
    formData.append('type', 'resetpassword')
    formData.append('resetId', id)
    formData.append('newPassword', password)

    auth(formData)
      .then(res => {
        setFlag(true)
        // setTimeout(() => setFlag(false), 5000)
        if(res.data?.type === 'success')
          setMsg('You changed password successfully.')
        else if(res.data?.msg === "fail") setMsg("Error updating password.")
      }).catch(err => {
      err_func(err, history)
    })
  }

  const checkValidation = () => {
    setIsValid(password.length > 7 && (password === confirmPassword))
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
    checkValidation()
  }

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    checkValidation()
  }

  return (
    <div className={classes.container}>
      <h3>New Password</h3>
      <input type={"password"} value={password} onChange={onChangePassword} className={classes.input} minLength={8} placeholder={'minimum 8 characters'}/>
      <h3>Confirm Password</h3>
      <input type={"password"} value={confirmPassword} onChange={onChangeConfirmPassword} className={classes.input} minLength={8}/>
      <Button variant="contained" className={classes.button} onClick={onSubmit} disabled={isValid}>
        Submit
      </Button>
      {flag? <div className={'mt-4'}>
        {msg}
      </div> : null}
    </div>
  )
}

export default ResetPassword;
