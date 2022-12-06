import React from 'react'
import GetData from '../GeneralComp/GetData/GetData';
import Table from '../GeneralComp/Table/Table';

export default function Referral({healthCardNumber}) {
  let [referrals] = GetData('/api/patient/referrals/' + healthCardNumber);

  return (<>
  <h1>Referrals</h1>
  <Table data={referrals}
  attributesOrder={['healthProblem', 'specialization', 'firstName', 'lastName', 'phoneNo', 'email']}
  titles={['Health Problem', 'Specialization', 'First Name', 'Last Name', 'Phone No', 'Email']}
  gridTemplate={'1fr 1fr 1fr 1fr 1fr 1fr'} />
  </>)
}
