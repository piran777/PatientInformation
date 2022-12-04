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



app.use('/api', router);


//Get patient by healthcard number
router.get('/patient/healthcard/:number', async (req, res) => {
    const patientHealthCard = req.params.number
    
    const patient = await query(`SELECT c.* FROM patientcontactview c LEFT JOIN patient p ON p.firstName = c.firstName WHERE p.healthCardNumber = "${patientHealthCard}"`);
    res.send(patient.result);
})

//Get patient by name
router.get('/patient/name/:name', async (req, res) => {
  const patientName = req.params.name.split(' ')

  const patient = await query(`SELECT * FROM patientcontactview WHERE firstName = "${patientName[0]}" AND lastName = "${patientName[1]}"`);
  res.send(patient.result);
})


startDatabaseConnection().then(async () => {
  app.listen(port, () => {
    console.log("Main Server: Listening on port ", port);
  })
})