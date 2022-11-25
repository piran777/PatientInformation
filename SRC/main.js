const path = './ScriptsGeneratingData/';
const mysql = require('mysql2');
const fs = require('fs');
const pathA = require('path');

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
    host : "ec2-3-82-125-52.compute-1.amazonaws.com",
    user : "akassara",
    password : "sdfaswqer@#A1",
    database : "patient_information"
});

function generateDataThatIsIndependent() {
    con.connect(function(err) {
        if(err) throw err;
        console.log("Connected!");
        
        // OtherDoctor, FamilyDoctor, Patient, Medication, SymptomTreatmentData, IllnessProbabilityData, HelathProblemSpecilizationData

        // json files
        // OtherDoctor, FamilyDoctor, Patient, Medication, 

        //add SymptomTreatmentData
        let symptomTreatmentData = genSymptomsTreatmentData();
     
        if(symptomTreatmentData.length > 0) {
            let output = [];
            for(let i = 0; i < symptomTreatmentData.length; i++) {
                output.push(Object.values(symptomTreatmentData[i]));
            }

            //con.query(generateSQL(symptomTreatmentData[0], "symptomtreatmentdata"), [output], function(err, result) {if(err) throw err;});
        }
   
    

        // //add IllnessProbabilityData
        let illnessProbabilityData = genIllnessProbabilityData();
        let index = 1;
        if(illnessProbabilityData.length > 0) {
            let output = [];
            for(let i = 0; i < illnessProbabilityData.length; i++) {
                output.push(Object.values(illnessProbabilityData[i]));

                if(i >= index*1000) {//this is just to break up the inserts
                    ///con.query(generateSQL(illnessProbabilityData[0], "illnessprobabilitydata"), [output], function(err, result) {if(err) throw err; console.log(result);});
                    output = [];
                    index++;
                }
            }
            //con.query(generateSQL(illnessProbabilityData[0], "illnessprobabilitydata"), [output], function(err, result) {if(err) throw err; console.log(result);});

            console.log("completed illnessprobability data");
        }

   

        //add HelathProblemSpecilizationData
        let healthProblemSpecializationData = genHealthProblemSpecializationData();
        if(healthProblemSpecializationData.length > 0) {
            let output = [];
            for(let i = 0; i < healthProblemSpecializationData.length; i++) {
                output.push(Object.values(healthProblemSpecializationData[i]));
            }
            //con.query(generateSQL(healthProblemSpecializationData[0], "healthproblemspecilizationdata"), [output], function(err, result) {if(err) throw err; console.log(result)});
            console.log(output);
        }

        console.log("end");
    });
}
function generateDataWithoutFK() {
    con.connect(function(err) {
        if(err) throw err;
        console.log("Connected!");
        
        //json files
        //OtherDoctor, FamilyDoctor, Patient, Medication, 

        let doctorIndex = 0;

        //add OtherDoctor
        let OtherDoctor = [];
        let outOtherDoctor = [];
        for(;doctorIndex < 1000; doctorIndex++) {
            let temp = genOtherDoctor(doctorIndex);
            OtherDoctor.push(temp);
            outOtherDoctor.push(Object.values(temp));
        }
        con.query(generateSQL(OtherDoctor[0], "otherdoctor"), [outOtherDoctor], function(err, result) {if(err) throw err; console.log(result)});
        saveJSON("OtherDoctor.json", OtherDoctor);

        //add FamilyDoctor
        let FamilyDoctor = [];
        let outFamDoctor = [];
        let max = doctorIndex + 1000;
        for(;doctorIndex < max; doctorIndex++) {
            let temp = genFamilyDoctor(doctorIndex);
            FamilyDoctor.push(temp);
            outFamDoctor.push(Object.values(temp));
        }
        con.query(generateSQL(FamilyDoctor[0], "familydoctor"), [outFamDoctor], function(err, result) {if(err) throw err; console.log(result)});
        saveJSON("FamilyDoctor.json", FamilyDoctor);

        //add Patient
        let Patient = [];
        let outPatient = [];
        for(let i = 0; i < 1000; i++) {
            if(i === 10) {
                continue;
            }
            let pat = genPatient(i);
            Patient.push(pat);
            outPatient.push(Object.values(pat));
        }
         con.query(generateSQL(Patient[0], "patient"), [outPatient], function(err, result) {if(err) throw err; console.log(result)});
         saveJSON("Patient.json", Patient);

        //add Medication
        let Medication = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'DataUsed/medicine.json')));
        let outMed = [];
        Medication.forEach((value) => {outMed.push(Object.values(value))});
        con.query(generateSQL({name : "something"}, "medication"), [outMed], function(err, result) {if(err) throw err; console.log(result)});
        saveJSON("Medication.json", Medication);
    });
}

function saveJSON(fileName, object) {
    fs.writeFile(pathA.resolve("SRC/TablesAsJSON/"+ fileName), JSON.stringify(object), function writeJSON(err) {
        if(err) return console.log(err);
        console.log("saved" + fileName);
    });
}
function generateSQL(element, tableName) {
    let sql = "INSERT INTO " + tableName + " (" + formatData(Object.keys(element)) + ") VALUES ?";
 
    return sql;
    function formatData(vals) {
        let str = "";
        vals.forEach((val) => {
            str += '' + val + ', ';
        });

        return str.slice(0, str.length-2);
    }
}

function addSubstancesToPatients() {
    con.connect(function(err) {
    if(err) return console.log(err);
        let patients = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/Patient.json')));
        
        let substances = [];
        let obj = [];
        for(let i = 0; i < patients.length; i++) {
            let birthDate = patients[i]["dateOfBirth"].split('-');
            let temp = genSubstance(new Date(birthDate[0], birthDate[1], birthDate[2]), patients[i]["healthCardNumber"]);
            substances.push(Object.values(temp));
            obj.push(temp);
        }

        con.query(generateSQL(obj[0], "substance"), [substances], function(err, result){if(err) throw err; console.log(result)});
    });
}
function addFamily() {
    con.connect(function(err) {
    if(err) return console.log(err);
    let patients = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/Patient.json')));

    let family = [];
    let obj = [];
    for(let i = 0; i < patients.length-1; i++) {
        let temp = genFamily(patients[i]["healthCardNumber"], patients[i+1]["healthCardNumber"]);
        family.push(Object.values(temp));
        obj.push(temp);
    }

    con.query(generateSQL(obj[0], "family"), [family], function(err, result){if(err) throw err; console.log(result)});
    });
}

function addFamilyDoctorAssignment() {
    con.connect(function(err) {
    if(err) return console.log(err);
    let patients = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/Patient.json')));
    let FamilyDoctor = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/FamilyDoctor.json')));

    
    for(let i = 0; i < patients.length; i++) {
        let assignment = [];
        let obj = [];
        let birthDate = patients[i]["dateOfBirth"].split('-');
        let temp = genFamilyDoctorAssignment(new Date(birthDate[0], birthDate[1], birthDate[2]),patients[i]["healthCardNumber"],FamilyDoctor);

        for(let d = 0; d < temp.length; d++) {
            assignment.push(Object.values(temp[d]));
            obj.push(temp[d]);
        }

        con.query(generateSQL(obj[0], "familydoctorpatientassignment"), [assignment], function(err, result){if(err) throw err; console.log(result)});

    }

    });
}

function addSurgery() {
    con.connect(function(err) {
        if(err) return console.log(err);
        let patients = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/Patient.json')));
        let OtherDoctor = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/OtherDoctor.json')));

        let surgery = [];
        let obj = [];
        for(let i = 0; i < patients.length; i++) {
            for(let d = 0; d < getRandomInt(0,7); d++) {
                let birthDate = patients[i]["dateOfBirth"].split('-');

                let temp = genSurgery(patients[i]["healthCardNumber"], OtherDoctor, new Date(birthDate[0], birthDate[1], birthDate[2]));
                surgery.push(Object.values(temp));
                obj.push(temp);
            }
        }
        con.query(generateSQL(obj[0], "surgery"), [surgery], function(err, result){if(err) throw err; console.log(result)});
    });
}

function addAppointment() {
    con.connect(function(err) {
        if(err) return console.log(err);

        let RawSymptoms = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'DataUsed/illnessSymptoms.json')));
        let Assignments = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/test.json')));
        
        let Patients =  new Map();
        JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/Patient.json'))).forEach((value) => {
            Patients.set(value["healthCardNumber"], value);
        });

        let appointments = [];
        let objAppointments = [];

        for(let i = 0; i < Assignments.length; i++) {
            for(let d = 0; d < getRandomInt(2, 10); d++) {
                let birthDate = Patients.get(Assignments[i]["patientHealthCardNumber"])["dateOfBirth"].split('-');
                let date = new Date(birthDate[0], birthDate[1], birthDate[2]);

                let tempAppointment = genAppointment(RawSymptoms[0, getRandomInt(0, RawSymptoms.length-1)]["name"],Assignments[i]["familyDoctorMINC"] ,Assignments[i]["patientHealthCardNumber"], date);
                objAppointments.push(tempAppointment);
                appointments.push(Object.values(tempAppointment));
            }
        }
        con.query(generateSQL(objAppointments[0], "appointment"), [appointments], function(err, result){if(err) throw err; console.log(result)});
    });
}

function addSymptoms() {
    con.connect(function(err) {
        if(err) return console.log(err);

        let appointments = JSON.parse(fs.readFileSync(pathA.resolve(__dirname, 'TablesAsJSON/Appointment.json')));

        let symptoms = [];
        let obj = [];
        for(let i = 0; i < appointments.length; i++) {
            let temp = genSymptoms(appointments[i]["id"], appointments[i]["reasonforAppointment"]);

            temp.forEach((val) => {
                obj.push(val);
                symptoms.push(Object.values(val));
            });
        }
        con.query(generateSQL(obj[0], "symptom"), [symptoms], function(err, result){if(err) throw err; console.log(result)});


    });
}


function getRandomInt(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);

    if(max < min) {
        let temp = max;
        max = min;
        min = temp;
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(genPatient(1));
// console.log(genHealthProblemStatus( "sadfasd", new Date(2002, 3, 3), ""));
// console.log(genAppointment("He is hurt", "Broken leg", "CAMD12345679", "233422332as", new Date(2002, 3, 3)));
// console.log(genFamily("234","2345"));
//  console.log(genOtherDoctor(1));
//  console.log(genFamilyDoctor(1));
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

//import data to database (don't run these a second time)
// generateDataThatIsIndependent();//don't run this again it will cause issues as the data has already been added
//  generateDataWithoutFK();
// addSubstancesToPatients();
//addFamily();
// addFamilyDoctorAssignment();
// addSurgery();
// addAppointment();
// addSymptoms();