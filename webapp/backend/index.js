const express = require('express');
const {startDatabaseConnection, query} = require('./databaseConnection');


const app = express();
const port = 3000;

const router = express.Router();
app.use('/', express.static('../frontend/build'));
router.use(express.json());

router.post('/appointment', async (req,res)=>{ //insert an appointment
  let sqlAppointment = await query(` INSERT INTO appointment(
    startDateTime,
    endDateTime,
    notes,
    reasonforAppointment,
    FamilyDoctorMINC,patientHealthCardNumber
    )
    VALUES(
    '${req.body.startDateTime}',
    '${req.body.endDateTime}',
    '${req.body.notes}',
    '${req.body.reasonforAppointment}',
    '${req.body.familyDoctorMINC}',
    '${req.body.patientHealthCardNumber}'
    )`);

    let sqlViewAppointment = await query ( `SELECT  startDateTime,
    endDateTime,
    notes,
    reasonforAppointment,
    FamilyDoctorMINC,patientHealthCardNumber FROM appointment WHERE startDateTime = '${req.body.startDateTime}' AND  endDateTime ='${req.body.endDateTime}' AND NOTES =  '${req.body.notes}'
    AND reasonforAppointment = '${req.body.reasonforAppointment}' AND familyDoctorMINC = '${req.body.familyDoctorMINC}' AND patientHealthCardNumber = '${req.body.patientHealthCardNumber}'`);
     
  console.log(sqlAppointment)
  res.send(sqlViewAppointment);
} //returns the new inserted appointments
)

router.get('/appointment', async (req,res)=>{ //view all appointment to be used for calender
  
  let sqlViewAppointment = await query ( `SELECT  startDateTime,
  endDateTime,
  notes,
  reasonforAppointment,
  FamilyDoctorMINC,patientHealthCardNumber FROM appointment`);
  res.send(sqlViewAppointment);

})
router.get('/appointment/forDoctor', async (req,res)=>{ //view all appointments for a specific doctor //mayb for calender

  let sqlViewAppointment = await query ( `SELECT familyDoctorMINC, patientHealthCardNumber, startDateTime, endDateTime, notes, reasonforAppointment
  FROM  appointment
  WHERE familyDoctorMINC = "${req.body.familyDoctorMINC}"`);
  res.send(sqlViewAppointment);

})

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

//Insert a new patient
router.post('/patient', async (req, res) => {
  let newPatientSql = await query(`INSERT INTO patient(
    healthCardNumber,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    ethnicity,
    preferredLanguage,
    religion,
    phoneNo,
    email,
    address
  )
  VALUES (
    '${req.body.healthCardNumber}',
    '${req.body.firstName}',
    '${req.body.lastName}',
    '${req.body.dateOfBirth}',
    '${req.body.gender}',
    '${req.body.ethnicity}',
    '${req.body.preferredLanguage}',
    '${req.body.religion}',
    '${req.body.phoneNo}',
    '${req.body.email}',
    '${req.body.address}'
  )`);

  let doctorView = (await query(`SELECT * FROM patientContactView WHERE firstName = '${req.body.firstName}'AND lastName = '${req.body.lastName}'`)).result;

  res.send(doctorView);
})

//Inserts new medication for patient
router.post('/medication', async (req, res) => {
  let medicationSql = (await query(`INSERT INTO substance VALUES('${req.body.type}', '${req.body.startDate}', '${req.body.PatientHealthCardNumber}', '${req.body.endDate}')`)).result;

  let seeMedsSql = (await query(`SELECT * FROM substance WHERE PatientHealthCardNumber = '${req.body.PatientHealthCardNumber}'`)).result;

  seeMedsSql.forEach(element => {
    element.startDate = convertDate(element.startDate);
    element.endDate = convertDate(element.endDate);
  });

  res.send(seeMedsSql);
})

//Inserts new health problem for patient
router.post('/healthproblem', async (req, res) => {
  let healthproblemSql = (await query(`INSERT INTO healthproblem(type, startDate, PatientHealthCardNumber)
  VALUES('${req.body.type}', '${req.body.startDate}', '${req.body.PatientHealthCardNumber}')`))

  let newHealthProblemSql = (await query(`SELECT * FROM healthproblem WHERE PatientHealthCardNumber = '${req.body.PatientHealthCardNumber}'`)).result

  newHealthProblemSql.forEach(element => {
    element.startDate = convertDate(element.startDate);
    if(element.endDate != null) {
      element.endDate = convertDate(element.endDate);
    }
  });

  res.send(newHealthProblemSql);
})

//Inserts new surgery for patient
router.post('/surgery', async (req, res) => {
  let surgerySql = (await query(`INSERT INTO surgery(date, type, location, DoctorResponsibleMINC, PatientHealthCardNumber)
  VALUES('${req.body.date}', '${req.body.type}', '${req.body.location}', '${req.body.DoctorResponsibleMINC}', '${req.body.PatientHealthCardNumber}')`))

  let allSurgeriesSql = (await query(`SELECT * FROM surgery WHERE PatientHealthCardNumber = '${req.body.PatientHealthCardNumber}'`)).result

  convertDateArray(allSurgeriesSql);

  res.send(allSurgeriesSql);
})

//Inserts new immunization for patient
router.post('/immunization', async (req, res) => {
  let immunizationSql = (await query(`INSERT INTO immunization VALUES('${req.body.type}', '${req.body.date}', '${req.body.location}', '${req.body.lot}', '${req.body.dosage}', '${req.body.site}', '${req.body.PatientHealthCardNumber}')`))

  let allImmunizationsSql = (await query(`SELECT * FROM immunization WHERE PatientHealthCardNumber = '${req.body.PatientHealthCardNumber}'`)).result

  convertDateArray(allImmunizationsSql);

  res.send(allImmunizationsSql);
})

//Updates health problem end date to current date
router.put('/healthproblem', async (req, res) => {
  let updateHealthProblemSql = (await query(`UPDATE healthproblem SET endDate = CURDATE() WHERE id = '${req.body.id}'`));

  let getHealthProblemsSql = (await query(`SELECT * FROM healthproblem WHERE PatientHealthCardNumber = '${req.body.PatientHealthCardNumber}'`)).result;

  getHealthProblemsSql.forEach(element => {
    element.startDate = convertDate(element.startDate);
    if(element.endDate != null) {
      element.endDate = convertDate(element.endDate);
    }
  });

  res.send(getHealthProblemsSql);
})

function convertDateArray(data) {
  data.forEach(element => {
    if(element.date != null) {
      element.date = convertDate(element.date);
    }
  });
  return data;
}

function convertDate(date) {
  return date.toISOString().replace('T', ' ').replace('Z', '').replace(':00.000', '')
}

app.use('/api', router);

startDatabaseConnection().then(async () => {
  app.listen(port, () => {
    console.log("Main Server: Listening on port ", port);
  })
})