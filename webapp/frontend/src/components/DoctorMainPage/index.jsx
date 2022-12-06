import React from 'react'
import {Link } from 'react-router-dom';

export default function index() {
  return (<>
     <div>Welcome to Doctor Homepage</div>
    <Link to='/loggedin/patients'>View Your Patients</Link>
    <br/><br/>
    <Link to='/loggedin/search'>Search For Patients</Link>
  </>
  )
}
