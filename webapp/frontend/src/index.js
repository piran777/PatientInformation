import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom'; 
import Homepage from './components/homepage/index';
import DoctorLogin from './components/DoctorLogin/index'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path = "/" exact element={<Homepage />}></Route>
    <Route path = "/login" exact element={<DoctorLogin />}></Route>
  </Routes>
  </BrowserRouter>

);