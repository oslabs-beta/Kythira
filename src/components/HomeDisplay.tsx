import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeDisplay() {
    return (
      <main className='verticalContainer'>
        <h2>Welcome to the homepage!!!</h2>
        <Link to="/main_window">Back to the log in page</Link>
        <span>Don't have an account?</span><Link to="/signup">Sign up</Link>
        <Link to="/forgotPassword">Forgot password?</Link>
      </main>
    );
  }