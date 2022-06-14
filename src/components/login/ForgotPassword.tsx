import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    return (
      <main className='verticalContainer'>
        <h2>Forgot your password?</h2>
        <input type='text' placeholder='Email' />
        <button>Send reset password link</button>
        <Link to="/main_window">Back to the log in page</Link>
      </main>
    );
  }