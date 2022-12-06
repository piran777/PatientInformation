import React from 'react'
import GetData from '../GeneralComp/GetData/GetData'
import Table from '../GeneralComp/Table/Table';

export default function PatientHealthProblemStatus({id}) {
  const [status] = GetData('/api/patient/healthproblem/status/' + id);

  return (<>
  <h1>Health Problem Status</h1>
  <Table data={status.map((item) => {
    return {...item,
    dateTime : item.dateTime ? new Date(item.dateTime).toLocaleString() : ''}
  })}
  attributesOrder={['dateTime', 'status']}
  titles={['Date', 'Status']}
  gridTemplate={'1fr 1fr'}/>
  </>)
}
