const express = require('express');
const {startDatabaseConnection} = require('./databaseConnection');
const{query} = require('./databaseConnection');

const app = express();
const port = 3000;

const router = express.Router();
app.use('/', express.static('../frontend/build'));
router.use(express.json());

let appointments ;



router.post('/appointment', async (req,res)=>{
  let identical = false;
  
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
    AND reasonforAppointment = '${req.body.reasonforAppointment}' AND familyDoctorMINC = '${req.body.familyDoctorMINC}' AND patientHealthCardNumber = '${req.body.patientHealthCardNumber}'` );
     
  console.log(sqlViewAppointment)
  res.send(sqlViewAppointment);} //returns the new inserted appointments
)



app.use('/api', router);


startDatabaseConnection().then(async () => {
  app.listen(port, () => {
    console.log("Main Server: Listening on port ", port);
  })
})