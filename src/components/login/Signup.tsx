import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Sends a post request to the backend with the current email, username, and password values in state
  // If successful it reroutes the user to the homepage
  const verifySignup = () => {
    const user = {
      email: email,
      username: username,
      password: password,
    };

    fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        navigate('/home');
      })
      .catch(err => console.log('verifyLogin ERROR: ', err));
  };

  // Toggles the visibility of the password input container
  const togglePasswordVisibility = () => {
    const passwordInput = document.querySelector('#passwordInput');
    const type = document.querySelector('#passwordInput').getAttribute('type');

    passwordInput.setAttribute(
      'type',
      type === 'password' ? 'text' : 'password'
    );
  };
  return (
    <main className='verticalFlex'>
      <h2>Create a New Account</h2>
      <div>
        <input id='loginInput' type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div>
        <input id='loginInput' type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
        <input id='loginInput' type='password' placeholder='password' value={password}  onChange={e => setPassword(e.target.value)}/>
      </div>
      <div id='passwordConfig'>
        <span>
          <input data-testid='passwordToggle' id='pwToggle' type='checkbox' onClick={togglePasswordVisibility}/>
                 Show password
        </span>                
        <Link to="/forgotPassword">Forgot password?</Link>
      </div>
      <button id='loginBtn' onClick={verifySignup}>Sign up</button>
      <div id='signupConfig'>
        <span>Already have an account?</span>
        <Link to="/main_window">Log in</Link>
      </div>
    </main>
  );
}

