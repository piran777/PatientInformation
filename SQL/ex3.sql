
INSERT INTO patient_information.patient
VALUES ("1234567890PA","Piran","Aminullah",Date'2002-02-12','M',"Persian","English","Islam",7777777777,"piranaminullahtest@gmail.com","3048 NEW MONTGOMERY ST, Perry, Utah 29999-3567, United States");

INSERT INTO patient_information.patient
VALUES ("0000000010EY","billy","Albert",Date'1978-10-11','F',"Black","Russian","Judaism",3773767561,"ShanAlvis@hotmail.co.uk","2464 MELBA AVE, Marion, Illinois 98124-5065, United States");


INSERT INTO familydoctor (MINC, firstName, lastName, email, phoneNo)
VALUES('CAMD23333529', 'Merry', 'Tod', 'martod@gmail.com', '0987654321');


INSERT INTO familydoctor
VALUES('CAMD76735929', 'Barba', 'Lyle', 'BarbaLyle@rogers.com', 5136018433);


INSERT INTO appointment (patientHealthCardNumber, familyDoctorMINC)
SELECT p.healthCardNumber, f.MINC
FROM patient p, familydoctor f
WHERE p.firstName = "Piran" AND f.firstName = "Martin";

INSERT INTO appointment(patientHealthCardNumber, familyDoctorMINC)
VALUES("0000000010EY", 'CAMD76735929');




SELECT * FROM familydoctor;