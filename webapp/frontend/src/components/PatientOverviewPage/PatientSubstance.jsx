import React from 'react'
import GetData from '../GeneralComp/GetData/GetData';
import Table from '../GeneralComp/Table/Table';

export default function PatientSubstance({healthCardNumber}) {
  const [substances] = GetData('/api/patient/substance/' + healthCardNumber)
  return (<>
    <h1>Substance Use</h1>
    
    <Table data={substances.map((item) => {
      return {...item, 
      startDate : item.startDate ? new Date(item.startDate).toLocaleDateString() : '',
      endDate : item.endDate ? new Date(item.endDate).toLocaleDateString() : ''}
    })}
    attributesOrder={['type', 'startDate', 'endDate']}
    titles={['Type', 'Start Date', 'End Date']}
    gridTemplate={'1fr 1fr 1fr'}
      />
  </>)
}
