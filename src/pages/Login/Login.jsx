import React, { useState, useEffect } from 'react';
import './login.css';
import assets from '../../assets/assets';
import { signup, login } from '../../config/firebase';

export const Login = () => {
  // Step 1: Load state from localStorage or fallback to 'Sign Up'
  const [currentState, setCurrentState] = useState(() => {
    return localStorage.getItem('authState') || 'Sign Up';
  });

  // Step 2: Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', currentState);
  }, [currentState]);

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    event.preventDefault();
    if (currentState === 'Sign Up') {
      signup(userName, email, password);
    }
    else {
      login(email, password)
    }
  }

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState === 'Sign Up' ? <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" placeholder='username' className="form-input" required /> : null}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email address' className="form-input" required />
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' className="form-input" required />
        <button type='submit'>{currentState}</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot"></div>
        <p className="login-toggle">
          {currentState === 'Sign Up' ? 'Already have an account' : 'Don’t have an account?'}{" "}
          <span onClick={() => setCurrentState(currentState === 'Sign Up' ? 'Login' : 'Sign Up')}>
            click here
          </span>
        </p>
      </form>
    </div>
  );
};
