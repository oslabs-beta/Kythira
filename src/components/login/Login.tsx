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

    const verifyLogin = () => {
        const user = {
            username: username,
            password: password,
        }

        console.log('user to be verified ', user)
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from backend', data);
                if(data === true){
                    setVerified(data);
                    navigate('/home');
                } else {
                    setVerified(false);
                    setUsername('');
                    setPassword('');

                }
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

    const githubOnClick = async() => {
        ipcRenderer.invoke("goGithub");
    }
    
    ipcRenderer.on('newUrl', (event, data) => {
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
                {/* <a href="https://github.com/login/oauth/authorize?client_id=e4a70dc5fa8c873142f8">Login with Github</a> */}
                <button id='githubBtn' onClick={githubOnClick}><img id='githubLogo' src={githubLogo}/>  Login with GitHub</button>
            </div>
        </div>
    )
}

export default LoginDisplay;


