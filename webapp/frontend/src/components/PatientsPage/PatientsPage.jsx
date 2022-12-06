import React from 'react'
import GetData from '../GeneralComp/GetData/GetData'
import Table from '../GeneralComp/Table/Table';
import {Link} from 'react-router-dom'; 

export default function PatientsPage({MINC}) {
  const [patients] = GetData('/api/familydoctor/patients/' + MINC);

  return (<>
    <h1>Patients</h1>
    <Table data={patients.map((item) => {
      return {...item, healthCardNumber : (<Link to={'/loggedin/patient/'+ item.healthCardNumber}>{item.healthCardNumber}</Link>)}
    })}
      attributesOrder={['startDate','endDate', 'firstName', 'lastName', 'healthCardNumber']}
      titles={['Start Date', 'End Date', 'First Name', 'Last Name', 'Health Card Number']}
      gridTemplate={'1fr 1fr 1fr 1fr 1fr'}/>
  </>)
}
