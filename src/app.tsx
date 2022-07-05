import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginDisplay from './components/login/Login';
import Signup from './components/login/Signup';
import ForgotPassword from './components/login/ForgotPassword';
import HomeDisplay from './components/home/HomeDisplay';
import './stylesheets/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/main_window' element={<LoginDisplay />} />
        <Route path='signup' element={<Signup />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='/home' element={<HomeDisplay />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById('app');
//LOOK INTO WHY WE USE THE BANG OPERATOR
const root = createRoot(container!);
root.render(<App/>);

export default App;