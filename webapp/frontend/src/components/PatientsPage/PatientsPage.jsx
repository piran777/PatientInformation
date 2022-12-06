import React from 'react'
import GetData from '../GeneralComp/GetData/GetData'
import Table from '../GeneralComp/Table/Table';
import {Link} from 'react-router-dom'; 

export default function PatientsPage() {
  const [patients] = GetData('/api/familydoctor/patients/' + localStorage.getItem('MINC'));
  const [prevPatients] = GetData('/api/familydoctor/prevpatients/' + localStorage.getItem('MINC'));

  return (<>
    <h1>Patients</h1>
    <Table data={patients.map((item) => {
      return {...item, 
        healthCardNumber : (<Link to={'/loggedin/patient/'+ item.healthCardNumber}>{item.healthCardNumber}</Link>),
        startDate : item.startDate ? new Date(item.startDate).toLocaleString() : ''
      }
    })}
      attributesOrder={['startDate', 'firstName', 'lastName', 'healthCardNumber']}
      titles={['Start Date', 'First Name', 'Last Name', 'Health Card Number']}
      gridTemplate={'1fr 1fr 1fr 1fr'}/>

      <h1>Previous Patients</h1>
      <Table data={prevPatients.map((item) => {
      return {...item, 
        healthCardNumber : (<Link to={'/loggedin/patient/'+ item.healthCardNumber}>{item.healthCardNumber}</Link>),
        startDate : item.startDate ? new Date(item.startDate).toLocaleString() : '',
        endDate : item.endDate ? new Date(item.endDate).toLocaleString() : ''
      }
    })}
      attributesOrder={['startDate', 'endDate', 'firstName', 'lastName', 'healthCardNumber']}
      titles={['Start Date', 'End Date', 'First Name', 'Last Name', 'Health Card Number']}
      gridTemplate={'1fr 1fr 1fr 1fr 1fr'}/>  </>)
}
