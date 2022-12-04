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