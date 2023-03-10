import React from 'react'
import GetData from '../../GeneralComp/GetData/GetData'
import Table from '../../GeneralComp/Table/Table';
import { Link } from 'react-router-dom';

export default function PatientPreviousHealthProblems({healthCardNumber}) {
  const [healthproblems] = GetData('/api/patient/healthproblems/previous/' + healthCardNumber);

  return (<>
    <h1>Patient Previous Health Problems</h1>
      <Table data={healthproblems.map((item) => {
        return {...item,
          type : (<Link to={'/loggedin/patient/healthproblem/' + item.id}>{item.type}</Link>),
          startDate : item.startDate ? new Date(item.startDate).toLocaleDateString() : '', 
          endDate : item.endDate ? new Date(item.endDate).toLocaleDateString() : ''
        }
      })}
      attributesOrder={['type', 'startDate', 'endDate']}
      titles={['Health Problem', 'Start Date', 'End Date']}
      gridTemplate={'1fr 1fr 1fr'}
      />
    </>)
}

