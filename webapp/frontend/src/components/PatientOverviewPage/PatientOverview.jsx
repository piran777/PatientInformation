import React, { useEffect, useState } from 'react'
import PatientRiskFactors from './PatientRiskFactors/PatientRiskFactors';

export default function PatientOverview({healthCardNumber}) {
  const [patient, updatePatient] = PatientInfo(healthCardNumber);

  return (<>
    <p>Health Card Number: {patient.healthCardNumber}</p>
    <p>Patient: {patient.firstName + ' ' + patient.lastName}</p>
    <p>DOB: {!patient.dateOfBirth ? '' :new Date(patient.dateOfBirth).toLocaleDateString()}</p>
    <p>Gender: {patient.gender}</p>
    <p>Preferred Language: {patient.preferredLanguage}</p>
    <p>Ethnicity: {patient.ethnicity}</p>
    <p>Religion: {patient.religion}</p>
    <br/>
    <p>Phone Number: {patient.phoneNo}</p>
    <p>Email: {patient.email}</p>
    <p>Address: {patient.address}</p>

    <PatientRiskFactors healthCardNumber={healthCardNumber}/>
    </>);
}


function PatientInfo(healthCardNumber) {
  const [patient, setPatient] = useState({});

  useEffect(() => {
    updatePatient();
  }, [])

  async function updatePatient() {
    let result = await fetch('/api/patient/healthcard/'+ healthCardNumber);
    let body = await result.json();

    if(result.ok) {
      setPatient(body);
    } else {
      alert(body && body.error ? body.error : "There was an issue with getting the patient.");
    }
  }
  return [patient, updatePatient];
}