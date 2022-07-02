import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginDisplay from './components/login/Login';
import Signup from './components/login/Signup';
import ForgotPassword from './components/login/ForgotPassword';
import HomeDisplay from './components/home/HomeDisplay';
import './stylesheets/styles.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      {/* <main id='mainContainer'>
        <h1>K Y T H I R A</h1>
      </main> */}
      <Routes>
        <Route path='/main_window' element={<LoginDisplay />} />
        <Route path='signup' element={<Signup />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='/home' element={<HomeDisplay />} />
      </Routes>
    </BrowserRouter>
  )
}

const container = document.getElementById('app');
const root = createRoot(container!)
root.render(<App/>);

export default App;