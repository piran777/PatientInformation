import React, { useEffect, useState } from 'react'

export default function PatientOverview({healthCardNumber}) {
  const [patient, updatePatient] = PatientInfo(healthCardNumber);


  return (<>
    <p>patient name</p>
    <p></p>
    </>);
}


function PatientInfo(healthCardNumber) {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    updatePatient();
  }, [])

  async function updatePatient() {
    let result = await fetch('/api/patient/healthcard/'+ healthCardNumber);
    result = await result.json();
    console.log(result);
  }
  return [patient, updatePatient];
}