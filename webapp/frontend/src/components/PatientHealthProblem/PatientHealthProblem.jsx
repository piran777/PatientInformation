import React from 'react'
import PatientHealthProblemMedication from './PatientHealthProblemMedication'
import PatientHealthProblemStatus from './PatientHealthProblemStatus'
import {useParams } from 'react-router-dom';


export default function PatientHealthProblem() {
  const { id } = useParams();

  return (<>
    <PatientHealthProblemStatus id={id}/>
    <PatientHealthProblemMedication id={id}/>
  </>)
}
