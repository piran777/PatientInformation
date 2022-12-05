import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Index() {


  const [data, setData] = useState({MINC: ""});
  const [error, setError] = useState("");


  const handleSubmit = async (e) =>{

    e.preventDefault();

    try{
      const url = `http://localhost:3000/api/familydoctor/${data.MINC}`;
      const res = await axios.get(url);
      if(res.data == undefined || null){
        setError("Incorrect");
      }
      else{
        setError("Logged in Successfully");
        alert(JSON.stringify(res.data));
      }


    }catch (error) {
      alert(error);
    }
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
				placeholder="MINC"
				name="MINC"
        onChange={handleChange}
				value={data.MINC}
				required
				/>
        {error && <div>{error}</div>}
        <button type='submit'>Log-In</button>

      </form>

    </div>
  )
}
