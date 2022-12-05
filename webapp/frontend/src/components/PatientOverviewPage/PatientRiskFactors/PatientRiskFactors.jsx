import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function PatientRiskFactors({healthCardNumber}) {
  const [riskFactors, updateRiskFactors] = RiskFactors(healthCardNumber);
  console.log(riskFactors);
  return (
    <div>PatientRiskFactors</div>
  )
}


function RiskFactors(healthCardNumber) {
  const [riskFactors, setRiskFactors] = useState([]);

  useEffect(() => {
    updateRiskFactors();
  }, []);

  async function updateRiskFactors() {
    let result = await fetch('/api/patient/riskfactors/' + healthCardNumber);
    let body = await result.json();

    if(result.ok) {
      setRiskFactors(body);
    } else {
      alert(body && body.error ? body.error : "There was an issue with getting the risk factors");
    }
  }
  
  return [riskFactors, updateRiskFactors];
}