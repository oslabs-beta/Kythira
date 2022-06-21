import React from 'react';
import { Link } from 'react-router-dom';
// import Tree from './Tree';
import Visualizer from './Visualizer';
import Navigator from './Navigator';

export default function HomeDisplay() {
    return (
      <main className='verticalFlex'>
        <h2>Welcome to the homepage!!!</h2>
        <section className='horizontalFlex'>
          <Navigator />
          <Visualizer  />
        </section>
        <Link to="/main_window">Back to the log in page</Link>
        <span>Don't have an account?</span><Link to="/signup">Sign up</Link>
        <Link to="/forgotPassword">Forgot password?</Link>
      </main>
    );
  }