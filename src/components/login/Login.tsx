import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';

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
    // // Githuboauth is added by Nevruz
    // const gitHubAuth = () => {
    //     console.log("YOU HAVE CLICKED LOGIN WITH GITHUB");
    //     fetch(`http://localhost:8080/user/github/signin`)
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log("GITHUB AUTH IS IN PROGRESS!!! ===>");
    //     })
    // }

    //IPC ADDITIONAL PART

    const githubOnClick = () => {
        console.log('Github OAuth clicked');
        ipcRenderer.send('to-index',null);
    }

    let customMessage = 'HELLO FROM RENDERER PROCESS';
    const sendToBackend =() => {
        console.log('Send to backend function is triggered!');
        ipcRenderer.send("message",customMessage);
    }
    let number = 0
    const counter = () => {
        number ++;
        console.log('NOW NUMBER', number);
        // First IPC is going only one direction
        ipcRenderer.send("number", number);
        // Adding another ipc.on will make it uni directional.
        ipcRenderer.on("reply", (event,data) => {
            console.log(data);
        })
    }

    return (
        <div className='verticalFlex'>         
            <div>
                <input type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <input id='passwordInput' type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            {verified === false && <div style={{color: 'red'}}>Error: Incorrect username or password</div>
            }
            <div>
                <span>Show password</span><input type='checkbox' onClick={togglePasswordVisibility}/>
            </div>
            <div>
                <Link to="/forgotPassword">Forgot password?</Link><button onClick={verifyLogin}>Login</button>
            </div>
            <div>
                <span>Don't have an account?</span><Link to="/signup">Sign up</Link>
            </div>
            {/* THIS PART IS ADDED BY NEVRUZ */}
            <div>
                {/* <a href="https://github.com/login/oauth/authorize?client_id=e4a70dc5fa8c873142f8">Login with Github</a> */}
                <button onClick={githubOnClick} >Login with GitHub</button>
            </div>
            <div>
                <button onClick={sendToBackend}>SEND TO BACKEND</button>
                <button onClick={counter}>SEND COUNTER TO THE BACKEND</button>
            </div>
        </div>
    )
}

export default LoginDisplay;


