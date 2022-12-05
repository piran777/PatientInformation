import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom'; 
import Homepage from './components/homepage/index';
import DoctorLogin from './components/DoctorLogin/index'
import PatientsPage from './components/PatientsPage/PatientsPage';
import PatientOverview from './components/PatientOverviewPage/PatientOverview';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path = "/" exact element={<Homepage />}></Route>
    <Route path = "/login" exact element={<DoctorLogin />}></Route>

    {/* These routes are for when the family doctor is logged in (replace true with w
      something that will check if a doctor is logged in*/}
    <Route path='/loggedin' element={true ? <Outlet /> : <Homepage />}>
      <Route path="patients" element={<PatientsPage />}/>
      <Route path="patient/:healthCardNumber" element={<PatientOverview />}/>
    </Route>

    <Route path="*" element={<p>404 Not Found</p>} />
  </Routes>
  </BrowserRouter>

);