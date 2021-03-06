import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const verifySignup = () => {
    const user = {
        email: email,
        username: username,
        password: password,
    }

    console.log('user to be signedup ', user)

    fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/home');
        })
        .catch(err => console.log('verifyLogin ERROR: ', err))
}
  const togglePasswordVisibility = () => {
    const passwordInput = document.querySelector('#passwordInput')
    const type = document.querySelector('#passwordInput').getAttribute('type');

    passwordInput.setAttribute(
        'type',
        // Switch it to a text field if it's a password field
        // currently, and vice versa
        type === 'password' ? 'text' : 'password'
    );
}
    return (
      <main className='verticalFlex'>
        <h2>Create an account</h2>
        <div>
          <input type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <input type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
        <div>
          <input id='passwordInput' type='password' placeholder='password' value={password}  onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>
          <span>Show password</span><input data-testid='passwordToggle' type='checkbox' onClick={togglePasswordVisibility}/>
        </div>
        <button onClick={verifySignup}>Sign up</button>
        <span>Already have an account?</span><Link to="/main_window">Log in</Link>
      </main>
    );
  }

