const express = require('express');
const {startDatabaseConnection, query} = require('./databaseConnection');

const app = express();
const port = 3000;

const router = express.Router();
app.use('/', express.static('../frontend/build'));
router.use(express.json());

app.use('/api', router);


//Get patient by healthcard number
router.get('/patient/healthcard/:number', async (req, res) => {
    const patientHealthCard = req.params.number
    
    const patient = await query(`SELECT c.* FROM patientcontactview c LEFT JOIN patient p ON p.firstName = c.firstName WHERE p.healthCardNumber = "${patientHealthCard}"`);
    if(patient.result = []) {
      res.status(404).send("Patient with Health Card Number: " + patientHealthCard + " not found");
    } else {
      res.send(patient.result);
    }
})

//Get patient by name
router.get('/patient/name/:name', async (req, res) => {
  const patientName = req.params.name.split(' ')

  const patient = await query(`SELECT * FROM patientcontactview WHERE firstName = "${patientName[0]}" AND lastName = "${patientName[1]}"`);

  if(patient.result = []) {
    res.status(404).send("Patient with Name: " + req.params.name + " not found");
  } else {
    res.send(patient.result);
  }
})

//Get patients medical chart
router.get('/patient/medicalchart/:healthcardnumber', async (req, res) => {
  const patient = req.params.healthcardnumber;

  const patientName = (await query(`SELECT lastName, firstName FROM patient WHERE healthCardNumber = "${patient}"`)).result;
  const patientAppointment = convertDate((await query(`SELECT endDateTime AS lastAppointment FROM appointment WHERE patientHealthCardNumber = "${patient}" AND endDateTime = (SELECT MAX(endDateTime) FROM appointment WHERE patientHealthCardNumber = "${patient}")`)).result[0].lastAppointment);
  const patientImmunizations = (await query(`SELECT type AS immunization, date FROM immunization WHERE patientHealthCardNumber = "${patient}"`)).result;
  const patientSurgery = (await query(`SELECT type AS surgery, date FROM surgery WHERE patientHealthCardNumber = "${patient}"`)).result;
  const patientFamily = (await query(`SELECT relationshipTopatient, p.firstName, p.lastName FROM family f LEFT JOIN patient p ON p.healthCardNumber = f.familyID WHERE f.patientID = "${patient}"`)).result;
  const patientPastHealthProblem = (await query(`SELECT type AS previousHealthProblem, endDate AS previousHealthProblemEndDate FROM healthproblem WHERE patientHealthCardNumber = "${patient}"`)).result;
  const patientCurrentHealthProblem = (await query(`SELECT type AS currentHealthProblem, startDate AS currentHealthProblemStartDate FROM healthproblem WHERE patientHealthCardNumber = "${patient}" AND endDate IS NULL`)).result;
  const patientMedication = (await query(`SELECT type AS medication, startDate, endDate FROM substance WHERE patientHealthCardNumber = "${patient}"`)).result; 

  convertDateArray(patientImmunizations)
  convertDateArray(patientSurgery)
  convertDateArray(patientPastHealthProblem)
  convertDateArray(patientCurrentHealthProblem)

  patientMedication.forEach(element => {
    element.startDate = convertDate(element.startDate);
    element.endDate = convertDate(element.endDate);
  });

  const patientMedicalChart = {
    patientFirstName: patientName[0].firstName,
    patientLastName: patientName[0].lastName,
    patientLastAppointment: patientAppointment,
    patientImmunizations: patientImmunizations,
    patientSurgeries: patientSurgery,
    patientFamily: patientFamily,
    patientPastHealthProblem: patientPastHealthProblem,
    patientCurrentHealthProblem: patientCurrentHealthProblem,
    patientMedication: patientMedication
  }

  res.send(patientMedicalChart);
})


function convertDateArray(data) {
  data.forEach(element => {
    element.date = convertDate(element.date);
  });
  return data;
}

function convertDate(date) {
  return date.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', '')
}



startDatabaseConnection().then(async () => {
  app.listen(port, () => {
    console.log("Main Server: Listening on port ", port);
  })
})