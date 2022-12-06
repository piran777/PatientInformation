import React from 'react'
import GetData from '../GeneralComp/GetData/GetData';
import Table from '../GeneralComp/Table/Table';

export default function PatientSurgery({healthCardNumber}) {
  const [surgeries] = GetData('/api/patient/surgeries/' + healthCardNumber);

  return (<>
    <h1>Surgeries</h1>  
    <Table
    data={surgeries.map((item) => {
      return {...item, 
      date : item.date ? new Date(item.date).toLocaleDateString() : ''}
    })}
    attributesOrder={['type', 'date', 'location', 'MINC', 'specialization', 'firstName', 'lastName', 'email', 'phoneNo']}
    titles={['Type', 'Date', 'Location', 'Doctor MINC', 'Specilization', 'First Name', 'Last Name', 'Email', 'Phone No']}
    gridTemplate={'1fr 0.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'}
    />
  </>)
}
