import React from 'react'
import { useState } from 'react';

export default function Index() {


  const [data, setData] = useState({MINC: ""}, {password: ""});
  const [error, setError] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    alert("working");
  }
  const handleChange = ({currentTarget: input}) => {
    setData({...data,[input.name]: input.value });
};

  return (
    <div>
      <form onSubmit= {handleSubmit}>
      <h1>Doctors Log-In</h1>
      <br/>
      <input
				type="text"
				placeholder="MINC "
				name="MINC"
        onChange={handleChange}
				value={data.MINC}
				required
				/>
        <button type='submit'>Log-In</button>

      </form>

    </div>
  )
}
