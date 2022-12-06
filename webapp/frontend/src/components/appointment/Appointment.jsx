import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function Index() {


  const [data, setData] = useState({});
  const [error, setRes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    console.log(data)
    e.preventDefault();

    try{ 
     
      const url = `http://localhost:3000/api/appointment/add`;
      let rest = {
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        notes: data.notes,
        reasonforAppointment: data.reasonforAppointment,
        familyDoctorMINC: data.familyDoctorMINC,
        patientHealthCardNumber:  data.patientHealthCardNumber
      } 
      const res = await axios.post(url, {
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        notes: data.notes,
        reasonforAppointment: data.reasonforAppointment,
        familyDoctorMINC: data.familyDoctorMINC,
        patientHealthCardNumber:  data.patientHealthCardNumber
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      setRes("Appointment Added");

    }
    catch (error) {
      setRes(error.response.data.error);
    }
  }
  
  const handleChange = ({currentTarget: input}) => {
    setData({...data,[input.name]: input.value });
};

  return (
    <div>
      <form onSubmit= {handleSubmit}>
      <h1>Add appointment</h1>
      <br/>
      <input type = "text" placeholder = "ex: 2022-31-12 00:00:00.00" name="startDateTime" 
        onChange={handleChange} value = {data.startDateTime } required/>
        <input type = "text" placeholder = "ex: 2022-31-12 00:00:00.00" name="endDateTime" 
       onChange={handleChange} value = {data.endDateTime} required/>
       <input type = "text" placeholder = "ex: notes" name="notes" 
       onChange={handleChange} value = {data.notes} required/>
       <input type = "text" placeholder = "ex: reasonforAppointment" name="reasonforAppointment" 
       onChange={handleChange} value = {data.reasonforAppointment} required/>
        <input type = "text" placeholder = "ex: CAMD65483259" name="familyDoctorMINC" 
       onChange={handleChange} value = {data.familyDoctorMINC} required/>
        <input type = "text" placeholder = "ex: 1684257956LF" name="patientHealthCardNumber" 
       onChange={handleChange} value = {data.patientHealthCardNumber} required/>
        {error && <div>{error}</div>}
        <button type='submit'>Submit</button>

      </form>

    </div>
  )
}



