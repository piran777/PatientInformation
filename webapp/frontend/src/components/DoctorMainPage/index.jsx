import React from 'react'
import {useNavigate, Link} from 'react-router-dom';

export default function Index() {
    const navigate = useNavigate();
    const handleLogOut = () =>{
        localStorage.setItem("MINC", "");
        alert("Successfully logged out")
        setTimeout(function() {
            navigate ('/login')
          }, 500);
    }
    const handleOpenCalendar = () => {
        if(!localStorage.getItem("MINC")){
            alert("Please log in first");
            setTimeout(function() {
                navigate ('/login')
              }, 500);
        }
        else {
            navigate('/main/calendar');
        }
    }

  return (
    <div>
        <div>Welcome to Doctor Homepage</div>
        <button type='button' onClick={handleLogOut}>Log Out</button>
        <button type='button' onClick={handleOpenCalendar}>Open Calendar</button>
        <br/><br/>
        <Link to='/loggedin/patients'>View Your Patients</Link>
        <br/><br/>
        <Link to='/loggedin/search'>Search For Patients</Link>
        <br/><br/>
        <Link to='/loggedin/querytreatment'>Search for treatments</Link>
    </div>
  )
}
