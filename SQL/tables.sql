CREATE DATABASE patient_information;

CREATE TABLE patient_information.medication (
  name VARCHAR(100) NOT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id));
  
  CREATE TABLE patient_information.patient (
  healthCardNumber VARCHAR(100) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  dateOfBirth DATE NOT NULL,
  gender VARCHAR(100) NOT NULL,
  ethnicity VARCHAR(100) NOT NULL,
  preferredLanguage VARCHAR(100) NOT NULL,
  religion VARCHAR(100) NOT NULL,
  phoneNo BIGINT(10) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL,
  PRIMARY KEY (healthCardNumber));
  
  
  CREATE TABLE patient_information.healthproblem (
  type VARCHAR(100) NOT NULL,
  id INT NOT NULL AUTO_INCREMENT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  PatientHealthCardNumber VARCHAR(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (PatientHealthCardNumber) REFERENCES patient (healthCardNumber)
  ON UPDATE CASCADE);

CREATE TABLE patient_information.healthproblemmedicationusage (
  startDate DATE NOT NULL,
  dosage INT NOT NULL,
  frequency INT NOT NULL,
  endDate DATE NOT NULL,
  medicationID INT NOT NULL,
  healthProblemID INT NOT NULL,
  PRIMARY KEY (medicationID, startDate,healthProblemID),
  FOREIGN KEY (medicationID) REFERENCES medication(id)
  ON UPDATE CASCADE,
  FOREIGN KEY (healthProblemID) REFERENCES healthproblem(id)
  ON UPDATE CASCADE);
 
 CREATE TABLE patient_information.familydoctor (
  MINC VARCHAR(100) NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phoneNo INT NOT NULL,
  PRIMARY KEY (MINC));
 
 CREATE TABLE patient_information.appointment (
  startDateTime DATETIME(2) NOT NULL DEFAULT '2022-01-01 00:00' ,
  endDateTime DATETIME(2) NOT NULL DEFAULT '2022-12-31 00:00',
  notes VARCHAR(300) NOT NULL DEFAULT 'NA',
  reasonforAppointment VARCHAR(300) NOT NULL DEFAULT 'NA',
  familyDoctorMINC VARCHAR(100) NOT NULL DEFAULT 'NA',
  patientHealthCardNumber VARCHAR(100) NOT NULL DEFAULT 'NA',
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  FOREIGN KEY (familyDoctorMINC) REFERENCES familydoctor(MINC)
  ON UPDATE CASCADE,
  FOREIGN KEY (patientHealthCardNumber) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE
  ON DELETE CASCADE);
 
 
 
  CREATE TABLE patient_information.test (
  type VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  AppointmentID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (type, AppointmentID),
  FOREIGN KEY (AppointmentID) REFERENCES appointment(id)
  ON UPDATE CASCADE
  );
 
 CREATE TABLE patient_information.testresult (
  component VARCHAR(100) NOT NULL,
  value INT NOT NULL,
  unit INT NOT NULL,
  note VARCHAR(100) NOT NULL,
  TestType VARCHAR(100) NOT NULL,
  AppointmentID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (component, TestType, AppointmentID),
  FOREIGN KEY (TestType) REFERENCES test(type)
  ON UPDATE CASCADE,
  FOREIGN KEY(AppointmentID) REFERENCES appointment(id)
  ON UPDATE CASCADE
  );
 
 
 
CREATE TABLE patient_information.substance (
  type VARCHAR(100) NOT NULL,
  startDate DATE NOT NULL,
  PatientHealthCardNumber VARCHAR(100) NOT NULL,
  endDate DATE NOT NULL,
 PRIMARY KEY (type, startDate, PatientHealthCardNumber),
 FOREIGN KEY (PatientHealthCardNumber) REFERENCES patient(healthCardNumber)
 ON UPDATE CASCADE);

CREATE TABLE patient_information.family (
  relationshipTopatient VARCHAR(100) NOT NULL,
  patientID VARCHAR(100) NOT NULL,
  familyID VARCHAR(100) NOT NULL,
  PRIMARY KEY (patientID, familyID),
  FOREIGN KEY (patientID) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE ,
  FOREIGN KEY (familyID) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE);
  
  CREATE TABLE patient_information.immunization (
  type VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(45) NOT NULL,
  lot VARCHAR(100) NOT NULL,
  dosage INT NOT NULL,
  site VARCHAR(100) NOT NULL,
  PatientHealthCardNumber VARCHAR(100) NOT NULL,
  PRIMARY KEY (type, date, PatientHealthCardNumber),
  FOREIGN KEY (PatientHealthCardNumber) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE);
  
  CREATE TABLE patient_information.healthproblemstatus (
  dateTime DATETIME(2) NOT NULL,
  status VARCHAR(100) NOT NULL,
  HealthProblemID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (dateTime, HealthProblemID),
  FOREIGN KEY (HealthProblemID) REFERENCES healthproblem(id)
  ON UPDATE CASCADE);
  
  CREATE TABLE patient_information.illnessprobabilitydata(
  illness VARCHAR(100) NOT NULL,
  resultingIllness VARCHAR(100) NOT NULL,
  probability INT NOT NULL,
  probabilityThreshold VARCHAR(45) NOT NULL,
  PRIMARY KEY (illness, resultingIllness));
  
CREATE TABLE patient_information.symptomtreatmentdata (
  symptom VARCHAR(100) NOT NULL,
  treatment VARCHAR(100) NOT NULL,
  PRIMARY KEY (symptom, treatment));

CREATE TABLE patient_information.doctor (
  MINC VARCHAR(100) NOT NULL,
  firstName VARCHAR(40) NOT NULL,
  lastName VARCHAR(40) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phoneNo BIGINT(10) NOT NULL,
  PRIMARY KEY (MINC));
  
  CREATE TABLE patient_information.otherdoctor (
  MINC VARCHAR(100) NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phoneNo BIGINT(100) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  PRIMARY KEY (MINC));

CREATE TABLE patient_information.referral (
  reason VARCHAR(300) NOT NULL,
  otherDoctorMINC VARCHAR(100) NOT NULL,
  appointmentID INT NOT NULL,
  PRIMARY KEY (reason, otherDoctorMINC, appointmentID),
  FOREIGN KEY (otherDoctorMINC) REFERENCES otherdoctor(MINC)
  ON UPDATE CASCADE,
  FOREIGN KEY(appointmentID) REFERENCES appointment(id));


CREATE TABLE patient_information.symptom (
  type VARCHAR(100) NOT NULL,
  appointmentID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (appointmentID, type),
  FOREIGN KEY(appointmentID) REFERENCES appointment(id)
  ON UPDATE CASCADE
  );

CREATE TABLE patient_information.familydoctorpatientassignment (
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  patientHealthCardNumber VARCHAR(100) NOT NULL,
  familyDoctorMINC VARCHAR(100) NOT NULL,
  PRIMARY KEY (familyDoctorMINC, patientHealthCardNumber, startDate),
  FOREIGN KEY (patientHealthCardNumber) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE,
  FOREIGN KEY (familyDoctorMINC) REFERENCES familydoctor(MINC)
  ON UPDATE CASCADE);

CREATE TABLE patient_information.healthrisk (
  resultingHealthProblem VARCHAR(500) NOT NULL,
  probability INT NOT NULL,
  overThreshold INT NOT NULL,
  patientHealthCardNumber VARCHAR(100) NOT NULL,
  PRIMARY KEY (resultingHealthProblem, patientHealthCardNumber),
  FOREIGN KEY (patientHealthCardNumber) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE);


CREATE TABLE patient_information.healthproblemspecilizationdata (
  healthProblem VARCHAR(500) NOT NULL,
  specilization VARCHAR(500) NOT NULL,
  PRIMARY KEY (healthProblem));


CREATE TABLE patient_information.surgery (
  date DATE NOT NULL,
  type VARCHAR(500) NOT NULL,
  location VARCHAR(200) NOT NULL,
  DoctorResponsibleMINC VARCHAR(100) NOT NULL,
  PatientHealthCardNumber VARCHAR(100) NOT NULL,
  id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(DoctorResponsibleMINC) REFERENCES doctor(MINC)
  ON UPDATE CASCADE,
  FOREIGN KEY(PatientHealthCardNumber) REFERENCES patient(healthCardNumber)
  ON UPDATE CASCADE
  );
  
