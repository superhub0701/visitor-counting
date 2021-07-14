import React from "react"
import {Link} from "react-router-dom"

const Login = () => {
  return (
    <div className={"justify-content-center align-items-center"}>
      <h1>Visitors Counting System</h1>
      <div className={"p-4"} style={{backgroundColor: "#2b5494"}}>
        <h2>Login</h2>
        <div className={"d-flex"}>
          <div className={'w-25'}>UserId: </div>
          <input className={'flex-grow-1'} type={'text'} />
        </div>
        <div className={"d-flex"}>
          <div className={'w-25'}>Password</div>
          <input className={'flex-grow-1'} type={'text'} />
        </div>
        <div className={"d-flex"}>
          <div className={'w-25'}></div>
          <div className={"d-flex flex-grow-1 justify-content-between"}>
            <label><input type={'checkbox'} className={"mr-1"} />Remember Me</label>
            <Link className={'flex-grow-1'} to={'/auth/forgotPassword'}>Forgot Password?</Link>
          </div>
        </div>
        <div className={"d-flex"}>
          <div className={'w-25'}></div>
          <button className={'flex-grow-1'}>LOGIN</button>
        </div>
      </div>
    </div>
  )
}

export default Login;
