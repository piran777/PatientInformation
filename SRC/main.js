const path = './ScriptsGeneratingData/';
const mysql = require('mysql2');

//functions to generate data
let genPatient = require(path+'patient.js').generatePatient;
let genHealthProblemStatus = require(path+'healthProblemStatus.js').generateHealthProblemStatus;
let genAppointment = require(path+'appointment.js').generateAppointment;
let genFamily = require(path+'family.js').generatePatient;
let genFamilyDoctor = require(path+'familyDoctor.js').generateDoctor;
let genFamilyDoctorAssignment = require(path+'familyDoctorAssignment.js').genFamilyDoctorAssignment;
let genHealthProblem = require(path+'healthProblem.js').generateHealthProblem;
let genHealthProblemSpecializationData = require(path+'healthProblemSpecializationData.js').healthProblemSpecializationData;
let genIllnessProbabilityData = require(path+'illnessProbabilityData.js').generateIllnessProbabilityData;
let genOtherDoctor = require(path+'otherDoctor.js').generateOtherDoctor;
let genReferral = require(path+'referral.js').generateReferral;
let genSubstance = require(path+'substance.js').generateSubstance;
let genSurgery = require(path+'surgery.js').generateSurgery;
let genSymptoms = require(path+'symptom.js').generateSymptoms;
let genSymptomsTreatmentData = require(path+'symptomtreatmentdata.js').generateSymptomTreatmentData;
let genTestResult = require(path+'testResult.js').generateTestResults;

//tables represended as an array


let con = mysql.createConnection({
    host : "ec2-34-203-191-252.compute-1.amazonaws.com",
    user : "akassara",
    password : "sdfaswqer@#A1"
});


function generateDataThatIsIndependent() {
    con.connect(function(err) {
        if(err) throw err;
        console.log("Connected!");
        
        //OtherDoctor, FamilyDoctor, Patient, Medication, SymptomTreatmentData, IllnessProbabilityData, HelathProblemSpecilizationData

        //json files
        //OtherDoctor, FamilyDoctor, Patient, Medication, 

        //add SymptomTreatmentData
        let symptomTreatmentData = genSymptomsTreatmentData();
        for(let i = 0; i < symptomTreatmentData.length; i++) {
            con.query(generateSQL(symptomTreatmentData[i], "symptomtreatmentdata"), function(err, result) {if(err) throw err;});
            //delay possibly
        }

        //add IllnessProbabilityData
        let illnessProbabilityData = genIllnessProbabilityData();
        for(let i = 0; i < illnessProbabilityData.length; i++) {
            con.query(generateSQL(illnessProbabilityData[i], "illnessprobabilitydata"), function(err, result) {if(err) throw err;});
            //delay possibly
        }

        //add HelathProblemSpecilizationData
        let healthProblemSpecializationData = genHealthProblemSpecializationData();
        for(let i = 0; i < healthProblemSpecializationData.length; i++) {
            con.query(generateSQL(healthProblemSpecializationData[i], "illnessprobabilitydata"), function(err, result) {if(err) throw err;});
            //delay possibly
        }

    });
}
console.log(Object.values(genSymptomsTreatmentData()[0]));

function generateDataWithoutFK() {
    con.connect(function(err) {
        if(err) throw err;
        console.log("Connected!");
        
        //json files
        //OtherDoctor, FamilyDoctor, Patient, Medication, 


    });
}

function generateSQL(element, tableName) {
    let sql = "INSERT INTO " + tableName + " (" + formatData(Object.keys(element)) + ") VALUES ("  + formatData(Object.values(element)) + ");";
 
    return sql;
    function formatData(vals) {
        let str = "";
        vals.forEach((val) => {
            str += '"' + val + '", ';
        });

        return str.slice(0, str.length-2);
    }
}

// console.log(genPatient(1));
// console.log(genHealthProblemStatus( "sadfasd", new Date(2002, 3, 3), ""));
// console.log(genAppointment("He is hurt", "Broken leg", "CAMD12345679", "233422332as", new Date(2002, 3, 3)));
// console.log(genFamily("234","2345"));
// console.log(genDoctor());
// console.log(genFamilyDoctorAssignment(new Date(2002, 3, 3), "233422332as", "CAMD-8932-345"));
// console.log(genHealthProblem(new Date(2002, 3, 3), "233422332as"));
// console.log(genHealthProblemSpecializationData());
// console.log(genIllnessProbabilityData());
// console.log(genOtherDoctor());
// console.log(genReferral("something", "234", "21343"));
// console.log(genSubstance(new Date(2002, 3,3), "23423"));
// console.log(genSurgery("23432AD","CM21231", new Date(2002, 3, 3)));
// console.log(genSymptoms(12));
// console.log(genSymptomsTreatmentData());
// console.log(genTestResult(12, "test1"));

//import data to database
//generateDataThatIsIndependent();
