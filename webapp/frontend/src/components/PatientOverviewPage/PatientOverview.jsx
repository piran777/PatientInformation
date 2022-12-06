import React from 'react'
import PatientRiskFactors from './PatientRiskFactors/PatientRiskFactors';
import GetData from '../GeneralComp/GetData/GetData';
import {useParams } from 'react-router-dom'
import PatientHealthProblems from './PatientHealthProblems/PatientHealthProblems';
import PatientPreviousHealthProblems from './PatientHealthProblems/PatientPreviousHealthProblems';
import PatientImmunizations from './PatientImmunizations';
import PatientFamily from './PatientFamily';

export default function PatientOverview() {
  const { healthCardNumber } = useParams();
  const [patient] = GetData('/api/patient/healthcard/' + healthCardNumber);

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
    <PatientHealthProblems healthCardNumber={healthCardNumber}/>
    <PatientPreviousHealthProblems healthCardNumber={healthCardNumber}/>
    <PatientImmunizations healthCardNumber={healthCardNumber}/>
    <PatientFamily healthCardNumber={healthCardNumber}/>
    <br/><br/>
    </>);

}
