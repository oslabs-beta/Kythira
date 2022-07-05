import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import githubLogo from '../../assets/github-logo-32px.png';
import loginIcon from '../../assets/login-icon.png';

const LoginDisplay = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verified, setVerified] = useState<boolean | undefined>();

  const navigate = useNavigate();

  // Sends a post request to the backend with the current username, and password values in state
  // If successful it reroutes the user to the homepage    
  const verifyLogin = () => {
    const user = {
      username: username,
      password: password,
    };

    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if(data === true){
          setVerified(data);
          navigate('/home');
        } else {
          setVerified(false);
          setUsername('');
          setPassword('');

        }
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

  // Function to initiate OAuth in the main process
  const githubOnClick = async() => {
    ipcRenderer.invoke('goGithub');
  };
    
  // Listener to navigate the user to the main page once OAuth is complete in the main process
  ipcRenderer.on('gitoAuth', (event, data) => {
    navigate('/home');
  });

  return (
    <div className='verticalFlex' id='loginContainer'> 
      <div>
        <img id='loginIcon' src={loginIcon}/>
      </div>        
      <div>
        <input id='loginInput' type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
        <input id='loginInput' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      {verified === false && <div style={{color: 'red'}}>Error: Incorrect username or password</div>
      }
      <div id='passwordConfig'>
        <span>
          <input data-testid='passwordToggle' id='pwToggle' type='checkbox' onClick={togglePasswordVisibility}/>
                 Show password
        </span>                
        <Link to="/forgotPassword">Forgot password?</Link>
      </div>
      <div>
        <button id='loginBtn' onClick={verifyLogin}>L O G I N</button>
      </div>
      <div id='signupConfig'>
        <span>Don't have an account?</span>
        <Link to="/signup">Sign up</Link>
      </div>
      <div>
        <button id='githubBtn' onClick={githubOnClick}><img id='githubLogo' src={githubLogo}/>  Login with GitHub</button>
      </div>
    </div>
  );
};

export default LoginDisplay;