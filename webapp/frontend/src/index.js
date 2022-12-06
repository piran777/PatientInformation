import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom'; 
import Homepage from './components/homepage/index';
import DoctorLogin from './components/DoctorLogin/index'
import DoctorMainPage from './components/DoctorMainPage/index';
import PatientsPage from './components/PatientsPage/PatientsPage';
import PatientOverview from './components/PatientOverviewPage/PatientOverview';
import AppointmentCalendar from './components/AppointmentCalendar/index';
import PatientHealthProblem from './components/PatientHealthProblem/PatientHealthProblem';
import SearchPatient from './components/SearchPage/Search';
import AddAppointment from './components/appointment/Appointment';
import SuggestedTreatments from './components/SuggestedTreatments/SuggestedTreatments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path = "/" exact element={<Homepage />}></Route>
    <Route path = "/login" exact element={<DoctorLogin />}></Route>

    <Route path = "/main" exact element={<DoctorMainPage />}></Route>
    <Route path = "/main/calendar" exact element={<AppointmentCalendar />}></Route>
    <Route path = "/main/addAppointment" exact element={<AddAppointment />}></Route>

    {/* These routes are for when the family doctor is logged in (replace true with w
      something that will check if a doctor is logged in*/}
    <Route path='/loggedin' element={localStorage.getItem('MINC') ? <Outlet /> : <Homepage />}>
      <Route path="patients" element={<PatientsPage />}/>
      <Route path="patient/:healthCardNumber" element={<PatientOverview />}/>
      <Route path='patient/healthproblem/:id' element={<PatientHealthProblem />}/>
      <Route path='search' element={<SearchPatient/>}></Route>
      
      <Route path='main' element={<></>}></Route>
      <Route path='main/calendar' element={<></>}></Route>
      <Route path='main/addAppointment' element={<></>}></Route>
      <Route path='querytreatment' element={<SuggestedTreatments />}></Route>
    </Route>

    <Route path="*" element={<p>404 Not Found</p>} />

  </Routes>
  </BrowserRouter>

);