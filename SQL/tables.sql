CREATE TABLE `patient_information`.`medication` (
  `name` VARCHAR(100) NOT NULL,
  `id` INT NOT NULL,
  PRIMARY KEY (`id`));
  CREATE TABLE `patient_information`.`healthproblem` (
  `type` VARCHAR(100) NOT NULL,
  `id` INT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `PatientHealthCardNumber` INT NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `patient_information`.`healthproblemmedicationusage` (
  `startDate` DATE NOT NULL,
  `dosage` INT NOT NULL,
  `frequency` INT NOT NULL,
  `endDate` DATE NOT NULL,
  `medicationID` INT NOT NULL,
  `healthProblemID` INT NOT NULL,
  PRIMARY KEY (`medicationID`, `startDate`, `healthProblemID`));
  CREATE TABLE `patient_information`.`testresult` (
  `component` VARCHAR(100) NOT NULL,
  `value` INT NOT NULL,
  `unit` INT NOT NULL,
  `note` VARCHAR(100) NOT NULL,
  `TestType` VARCHAR(45) NOT NULL,
  `AppointmentID` INT NOT NULL ,
  PRIMARY KEY (`component`, `TestType`, `AppointmentID`));
  CREATE TABLE `patient_information`.`test` (
  `type` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL,
  `AppointmentID` INT NOT NULL ,
  PRIMARY KEY (`type`, `AppointmentID`));
CREATE TABLE `patient_information`.`substance` (
  `type` VARCHAR(100) NOT NULL,
  `startDate` DATE NOT NULL,
  `PatientHealthCardNumber` INT NOT NULL,
  `endDate` DATE NOT NULL,
  PRIMARY KEY (`type`, `startDate`, `PatientHealthCardNumber`));
CREATE TABLE `patient_information`.`family` (
  `relationshipTopatient` VARCHAR(100) NOT NULL,
  `patientID` INT NOT NULL,
  `familyID` INT NOT NULL,
  PRIMARY KEY (`patientID`, `familyID`));
  CREATE TABLE `patient_information`.`immunization` (
  `type` VARCHAR(100) NOT NULL,
  `date` DATE NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `lot` VARCHAR(100) NOT NULL,
  `dosage` INT NOT NULL,
  `site` VARCHAR(100) NOT NULL,
  `PatientHealthCardNumber` INT NOT NULL,
  PRIMARY KEY (`type`, `date`, `PatientHealthCardNumber`));
  CREATE TABLE `patient_information`.`healthproblemstatus` (
  `dateTime` DATETIME(6) NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  `HealthProblemID` INT NOT NULL,
  PRIMARY KEY (`dateTime`, `HealthProblemID`));
  CREATE TABLE `patient_information`.`illnessprobabilitydata` (
  `Illness` VARCHAR(100) NOT NULL,
  `resultingIllness` VARCHAR(100) NOT NULL,
  `probability` INT NOT NULL,
  `probabilityThreshold` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Illness`, `resultingIllness`));
CREATE TABLE `patient_information`.`symptomtreatmentdata` (
  `symptom` VARCHAR(100) NOT NULL,
  `treatment` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`symptom`, `treatment`));
CREATE TABLE `patient_information`.`doctor` (
  `MINC` INT NOT NULL,
  `firstName` VARCHAR(40) NOT NULL,
  `lastName` VARCHAR(40) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phoneNo` INT NOT NULL,
  PRIMARY KEY (`MINC`));
CREATE TABLE `patient_information`.`referral` (
  `reason` VARCHAR(300) NOT NULL,
  `otherDoctorMINC` INT NOT NULL,
  `appointmentID` INT NOT NULL,
  PRIMARY KEY (`reason`, `otherDoctorMINC`, `appointmentID`));
CREATE TABLE `patient_information`.`otherdoctor` (
  `MINC` INT NOT NULL,
  `firstName` VARCHAR(30) NOT NULL,
  `lastName` VARCHAR(30) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phoneNo` INT NOT NULL,
  `specialization` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`MINC`));
CREATE TABLE `patient_information`.`familydoctor` (
  `MINC` INT NOT NULL,
  `firstName` VARCHAR(30) NOT NULL,
  `lastName` VARCHAR(30) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phoneNo` INT NOT NULL,
  PRIMARY KEY (`MINC`));
CREATE TABLE `patient_information`.`symptom` (
  `type` VARCHAR(100) NOT NULL,
  `appointmentID` INT NOT NULL,
  PRIMARY KEY (`appointmentID`, `type`));
CREATE TABLE `patient_information`.`appointment` (
  `startDateTime` DATETIME(6) NOT NULL,
  `endDateTime` DATETIME(6) NOT NULL,
  `notes` VARCHAR(300) NOT NULL ,
  `reasonforAppointment` VARCHAR(300) NOT NULL,
  `familyDoctorMINC` INT NOT NULL,
  `patientHealthCardNumber` INT NOT NULL,
  `id` INT NOT NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `patient_information`.`familydoctorpatientassignment` (
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `patientHealthCardNumber` INT NOT NULL,
  `familyDoctorMINC` INT NOT NULL,
  PRIMARY KEY (`familyDoctorMINC`, `patientHealthCardNumber`, `startDate`));
CREATE TABLE `patient_information`.`patient` (
  `healthCardNumber` INT NOT NULL,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `dateOfBirth` DATE NOT NULL,
  `gender` VARCHAR(50) NOT NULL,
  `ethnicity` VARCHAR(100) NOT NULL,
  `preferredLanguage` VARCHAR(100) NOT NULL,
  `religion` VARCHAR(100) NOT NULL,
  `phoneNo` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`healthCardNumber`));
CREATE TABLE `patient_information`.`healthrisk` (
  `resultingHealthProblem` VARCHAR(500) NOT NULL,
  `probability` INT NOT NULL,
  `overThreshold` INT NOT NULL,
  `patientHealthCardNumber` INT NOT NULL,
  PRIMARY KEY (`resultingHealthProblem`, `patientHealthCardNumber`));
CREATE TABLE `patient_information`.`symptomstreatment` (
  `symptom` VARCHAR(500) NOT NULL,
  `treatment` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`symptom`));
CREATE TABLE `patient_information`.`healthproblemspecilizationdata` (
  `healthProblem` VARCHAR(500) NOT NULL,
  `specilization` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`healthProblem`));
CREATE TABLE `patient_information`.`surgery` (
  `date` DATE NOT NULL,
  `type` VARCHAR(500) NOT NULL,
  `location` VARCHAR(200) NOT NULL,
  `DoctorResponsibleMINC` INT NOT NULL,
  `PatientHealthCardNumber` INT NOT NULL,
  `id` INT NOT NULL,
  PRIMARY KEY (`id`));
  
  ALTER TABLE `surgery`
MODIFY `id` INT NOT NULL AUTO_INCREMENT;
