import React, { Component } from 'react';
import '../styles/Login.css';
import Plants from '../assets/plants.svg'


class Login extends Component {
  render() {
    return (
        <div>
            <div className='nav'>
                <div id='logo-square'></div>
                <h1 id='logo'>Logo</h1>
            </div>
            <div id='login-portion'>
                <h1>Welcome back!</h1>
                <h2>Sign in to continue</h2>
                <input placeholder='Username'></input>
                <input placeholder='Password'></input>
                <button>Login</button>
                <p className='small-text'>Don't have an account? <span className='underline'>Sign up here.</span></p>
            </div>
            <img id='plants' src={Plants} alt='wall of plants'></img>
        </div>
      );
  }
}

export default Login;