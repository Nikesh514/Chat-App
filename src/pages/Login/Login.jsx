import React, { useState, useEffect } from 'react';
import './login.css';
import assets from '../../assets/assets';

export const Login = () => {
  // Step 1: Load state from localStorage or fallback to 'Sign Up'
  const [currentState, setCurrentState] = useState(() => {
    return localStorage.getItem('authState') || 'Sign Up';
  });

  // Step 2: Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', currentState);
  }, [currentState]);

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState === 'Sign Up' ? <input type="text" placeholder='username' className="form-input" required /> : null}
        <input type="email" placeholder='Email address' className="form-input" required />
        <input type="password" placeholder='password' className="form-input" required />
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
