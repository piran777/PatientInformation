
INSERT INTO patient_information.patient
VALUES ("1234567890PA","Piran","Aminullah",Date'2002-02-12','M',"Persian","English","Islam",7777777777,"piranaminullahtest@gmail.com","3048 NEW MONTGOMERY ST, Perry, Utah 29999-3567, United States");

INSERT INTO patient_information.patient
VALUES ("0000000010EY","billy","Albert",Date'1978-10-11','F',"Black","Russian","Judaism",3773767561,"ShanAlvis@hotmail.co.uk","2464 MELBA AVE, Marion, Illinois 98124-5065, United States");

INSERT INTO patient_information.patient
VALUES ("2233565322SC","Scott","Croykee",Date'2002-03-13','M',"Arabic","English","Islam",5197438907,"SC@gmail.com",'4603 MAHAN ST, Eugene, Oregon 95988-3836, United States');


INSERT INTO familydoctor (MINC, firstName, lastName, email, phoneNo)
VALUES('CAMD23333529', 'Merry', 'Tod', 'martod@gmail.com', '0987654321');


INSERT INTO familydoctor
VALUES('CAMD65483259', 'Bert', 'Lucious', 'Lucious@rogers.com', 3284605377);


INSERT INTO appointment (patientHealthCardNumber, familyDoctorMINC)
SELECT p.healthCardNumber, f.MINC
FROM patient p, familydoctor f
WHERE p.firstName = "Piran" AND f.firstName = "Martin";

INSERT INTO appointment(patientHealthCardNumber, familyDoctorMINC)
VALUES("0000000010EY", 'CAMD76735929');

INSERT INTO appointment
VALUES('2022-12-01 00:00','2022-12-02 23:59','fractured knee potentially. Maybe concussion as well','knee hurts and feeling dizzy', 'CAMD65483259','2233565322SC',2);


SELECT * FROM familydoctor;