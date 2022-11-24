const path = './ScriptsGeneratingData/';

//tested
let genPatient = require(path+'patient.js').generatePatient;
let genHealthProblemStatus = require(path+'healthProblemStatus.js').generateHealthProblemStatus;
let genAppointment = require(path+'appointment.js').generateAppointment;
let genFamily = require(path+'family.js').generatePatient;

//untested
let genDoctor = require(path+'familyDoctor.js').generateDoctor;
let genFamilyDoctorAssignment = require(path+'familyDoctorAssignment.js').genFamilyDoctorAssignment;
let genHealthProblem = require(path+'healthProblem.js').generateHealthProblem;
let genHealthProblemSpecializationData = require(path+'healthProblemSpecilizationData.js').healthProblemSpecializationData;
let generateIllnessProbabilityData = require(path+'illnessProbabilityData.js').generateIllnessProbabilityData;
let genOtherDoctor = require(path+'otherDoctor.js').generateOtherDoctor;
let genReferral = require(path+'referral.js').generateReferral;
let genSubstance = require(path+'substance.js').generateSubstance;
let genSurgery = require(path+'surgery.js').generateSurgery;
let genSymptoms = require(path+'symptom.js').generateSymptoms;
let genSymptomsTreatmentData = require(path+'symptomtreatmentdata.js').generateSymptomTreatmentData;
let genTestResult =  require(path+'testResult.js').generateTestResults;

//
const mysql = require('mysql');

// let con = mysql.createConnection({
//     host : "",
//     user : "akassara",
//     password : ""
// });

// con.connect(function(err) {
//     if(err) throw err;
//     console.log("Connected!");

//     con.query("sql", function(err, result) {
//         if(err) throw err;
//     });
// });

for(let i = 0; i < 3000; i++) {

}

// console.log(genPatient(1));
// console.log(genHealthProblemStatus( "sadfasd", new Date(2002, 3, 3), ""));
// console.log(genAppointment("He is hurt", "Broken leg", "CAMD12345679", "233422332as", new Date(2002, 3, 3)));
// console.log(genFamily("234","2345"));
