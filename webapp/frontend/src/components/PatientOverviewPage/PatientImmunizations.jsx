import React from 'react'
import GetData from '../GeneralComp/GetData/GetData';
import Table from '../GeneralComp/Table/Table';

export default function PatientImmunizations({healthCardNumber}) {
  const [immunizations] = GetData('/api/patient/immunizations/' + healthCardNumber);

  return (<>
    <h1>Immunizations</h1>
    <Table data={immunizations.map((item) => {
      return {...item, 
      date : item.date ? new Date(item.date).toLocaleDateString() : ''}
    })}
    attributesOrder={['date', 'type', 'lot', 'dosage', 'site', 'location']}
    titles={['Date', 'Type', 'Lot', 'Dosage', 'Site', 'Location']}
    gridTemplate={'1fr 1fr 1fr 1fr 1fr 4fr'}/>
  </>)
}
