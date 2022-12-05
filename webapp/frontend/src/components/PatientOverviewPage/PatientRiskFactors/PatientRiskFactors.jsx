import React, { useState, useEffect} from 'react'
import GetData from '../../GeneralComp/GetData/GetData';
import Table from '../../GeneralComp/Table/Table';

export default function PatientRiskFactors({healthCardNumber}) {
  const [riskFactors, updateRiskFactors] = GetData('/api/patient/riskfactors/' + healthCardNumber);

  return (<>
  <h1>Illness at Risk For</h1>
    <Table data={riskFactors} 
    attributesOrder={['resultingIllness', 'probability']}
    titles={['Illness', 'probability']} 
    gridTemplate={'1fr 1fr'}/>
    </>)
}
