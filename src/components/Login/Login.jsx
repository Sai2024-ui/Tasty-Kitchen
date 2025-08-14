import React from "react";
import "./Login.css";
import { useState } from "react";
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from "react-router-dom";


const Login = () => {
  const [username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg,setErrorMsg] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const onChangeUsername = event =>{
    setUsername(event.target.value);
  }
  const onChangePassword = event =>{
    setPassword(event.target.value);
  }
  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    console.log("Login successful, JWT Token:", jwtToken);
    navigate('/', {replace: true})
  }
  const onSubmitFailure = error => {
    setShowSubmitError(true)
    setErrorMsg(error)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const url = `https://apis.ccbp.in/login`
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }
  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }
  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
    <div className="login-container">
      <div className="login-box">
        <img src="/images/logo.png" alt="Tasty Kitchens Logo" className="logo" />
        <h2 className="login-title">Login</h2>
        <br></br>
        <form onSubmit={submitForm}>
          <label htmlFor="username">USERNAME</label>
          <input 
            type="text" 
            id="username" 
            name="username"
            value={username}
            onChange={onChangeUsername} 
          />

          <label htmlFor="password">PASSWORD</label>
          <input 
            type={showPassword ? "text" : "password"} 
            id="password" 
            name="password"
            value={password}
            onChange={onChangePassword} 
          />
          <div className="show-pwd">
            <label className="show-password-label">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <p className="show-pwd-p">
              Show Password
            </p>
          </label>
          </div>
          <button type="submit" className="login-btn">Login</button>
          {showSubmitError && (
            <p className="error-msg">*{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
      <img src="https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlyeWFuaXxlbnwwfHwwfHx8MA%3D%3D" alt="Background" className="background"/>
    </div>
  );
};

export default Login;
