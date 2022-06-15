import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const LoginDisplay = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                console.log(data);
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
        <div className='verticalContainer'>         
            <div>
                <input type='text' placeholder='username' onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <input id='passwordInput' type='password' placeholder='password' onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
                <span>Show password</span><input type='checkbox' onClick={togglePasswordVisibility}/>
            </div>
            <div>
                <Link to="/forgotPassword">Forgot password?</Link><button onClick={verifyLogin}>Login</button>
            </div>
            <div>
                <span>Don't have an account?</span><Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}

export default LoginDisplay;


