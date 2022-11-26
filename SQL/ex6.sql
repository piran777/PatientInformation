UPDATE appointment
SET startDateTime =  DATE_ADD(startDateTime, INTERVAL 1 MONTH), endDateTime = DATE_ADD(endDateTime, INTERVAL  1 MONTH)
WHERE startDateTime >= '2022-12-01 00:00' AND endDateTime <= '2023-01-07 23:59';
SELECT * FROM appointment;

INSERT INTO familydoctor (MINC, firstName, lastName, email, phoneNo)
VALUES('CAMD98765439', 'Roni', 'Jay', 'ronijay@gmail.com', '1123456789');

INSERT INTO patient
VALUES("1684257956LF", "Bob", "Chapek", "1972-11-24", 'M', 'White', 'English', 'Christianity', 7426643970, 'BriahnaCollyn@hotmail.co.uk', '6611 CUSTOM HOUSE PL, Holdenville, Oklahoma 48144-5946, United States');

INSERT INTO appointment (startDateTime, endDateTime, notes, reasonforAppointment, familyDoctorMINC, patientHealthCardNumber)
SELECT DATE_ADD(CURDATE(), INTERVAL 1 MONTH), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), 'Required checkup for any males 50, or about to turn 50', 'Colorectal Cancer Screening ', f.MINC, p.healthCardNumber
FROM patient p, familydoctor f
WHERE DATEDIFF(CURDATE(), p.dateOfBirth) < 18293 AND DATEDIFF(CURDATE(), p.dateOfBirth) > 18232 AND p.gender = 'M' AND f.MINC = (SELECT MINC
                                                                                                                                    FROM familydoctor
                                                                                                                                    ORDER BY CEIL(RAND())
                                                                                                                                    LIMIT 1)
ORDER BY p.dateOfBirth;


INSERT INTO healthrisk 
SELECT "Asbestosis, Mesothelioma, and Lung Cancer", 6, healthCardNumber
FROM patient
WHERE dateOfBirth < '1989-07-12'; 


SELECT * FROM healthrisk;
