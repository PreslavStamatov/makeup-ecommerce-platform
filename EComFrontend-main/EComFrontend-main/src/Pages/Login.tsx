import React, { useEffect, useState } from 'react'
import LoginForm from '../Components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { isTokenExpired } = useAuth();

  useEffect(() => {
    const isJWTExpired = isTokenExpired();
    if(localStorage.getItem("token") && !isJWTExpired) {
        navigate("/home");
    } else if(isJWTExpired){
      localStorage.removeItem("token");
    }
}, [])

  return (
    <div className="flex items-center m-auto justify-center bg-gray-100 mt-10"
          style={{width: '38%'}}>
      <LoginForm></LoginForm>
    </div>
  )
}

export default Login