import React from 'react'
import { Link } from 'react-router-dom';
import GetData from '../../GeneralComp/GetData/GetData'
import Table from '../../GeneralComp/Table/Table';


export default function PatientHealthProblems({healthCardNumber}) {
  const [healthproblems] = GetData('/api/patient/healthproblems/current/' + healthCardNumber);

  return (<>
    <h1>Patient Current Health Problems</h1>
      <Table data={healthproblems.map((item) => {
        return {...item, 
          type : (<Link to={'/loggedin/patient/healthproblem/' + item.id}>{item.type}</Link>),
          startDate : item.startDate ? new Date(item.startDate).toLocaleDateString() : ''
        }
      })}
      attributesOrder={['type', 'startDate']}
      titles={['Health Problem', 'Start Date']}
      gridTemplate={'1fr 1fr'}
      />
    </>)
}
