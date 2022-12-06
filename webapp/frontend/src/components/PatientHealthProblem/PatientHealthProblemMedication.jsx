import React from 'react'
import GetData from '../GeneralComp/GetData/GetData'
import Table from '../GeneralComp/Table/Table'

export default function PatientHealthProblemMedication({id}) {
  const [medication] = GetData('/api/patient/healthproblem/medication/' + id);

  return (<>
  <h1>Medication</h1>
  <Table
  data={medication.map((med) => {
    return {...med,
    startDate : med.startDate ? new Date(med.startDate).toLocaleString() : '',
    endDate : med.endDate ? new Date(med.endDate).toLocaleString() : ''
  }
  })}
  attributesOrder={['startDate', 'endDate', 'name', 'frequency', 'dosage']}
  titles={['Start Date', 'End Date', 'Medication Name', 'Frequency', 'Dosage']}
  gridTemplate={'1fr 1fr 1fr 1fr 1fr'}/>
  </>)
}
