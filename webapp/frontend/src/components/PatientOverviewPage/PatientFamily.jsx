import React from 'react'
import GetData from '../GeneralComp/GetData/GetData'
import Table from '../GeneralComp/Table/Table';

export default function PatientFamily({healthCardNumber}) {
  const [family] = GetData('/api/patient/family/' + healthCardNumber);


  return (<>
    <h1>Family Health Problems</h1>
    <Table data={family.map((item) => {
      return {...item, 
        startDate : item.startDate ? new Date(item.startDate).toLocaleDateString() : '',
      endDate : item.endDate ? new Date(item.endDate).toLocaleDateString() : ''}
    })}
    attributesOrder={['relationshipTopatient', 'firstName', 'lastName', 'type', 'startDate', 'endDate', 'phoneNo', 'email']}
    titles={['Relationship', 'First Name', 'Last Name', 'Health Problem', 'Start Date', 'End Date', 'Phone No', 'Email']}
    gridTemplate={'1fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr'}/>
  </>)
}
