import React from 'react'
import {Link } from 'react-router-dom';
import SuggestedTreatments from '../SuggestedTreatments/SuggestedTreatments';

export default function index() {
  return (<>
     <div>Welcome to Doctor Homepage</div>
    <Link to='/loggedin/patients'>View Your Patients</Link>
    <br/><br/>
    <Link to='/loggedin/search'>Search For Patients</Link>
    <br/><br/>
    <Link to='/loggedin/querytreatment'>Search for treatments</Link>
  </>
  )
}
