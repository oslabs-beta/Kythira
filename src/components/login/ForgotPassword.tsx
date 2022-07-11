import React from 'react';
import { Link } from 'react-router-dom';

// WIP component to reset user's passwords
export default function ForgotPassword() {
  return (
    <main className='verticalFlex'>
      <h2>Forgot your password?</h2>
      <input type='text' placeholder='email' />
      <button>Send reset password link</button>
      <Link to="/main_window">Back to the log in page</Link>
    </main>
  );
}