import React, { FC } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Login from '@pages/LogIn';
import Signup from '@pages/SignUp';

const App: FC = () => {

    return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate replace to='login' />}/>
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
      </Routes>
    </BrowserRouter>
    );
};

export default App;