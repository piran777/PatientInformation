CREATE VIEW appointmentView
AS SELECT p.firstName ,p.lastName, a.startDateTime, a.endDateTime, a.notes, a.reasonforAppointment, f.firstName AS DoctorFirstName, f.lastName AS DoctorLastName
FROM appointment a, familydoctor f, patient p
WHERE a.familyDoctorMINC = f.MINC AND a.patientHealthCardNumber = p.healthCardNumber
GROUP BY f.MINC
ORDER BY startDateTime, f.lastName;

CREATE VIEW patientContactView
AS SELECT p.firstName, p.lastName, p.phoneNo, p.email, p.address
FROM patient p
ORDER BY lastName;

INSERT INTO appointmentView
VALUES ("Chris","Tucker","2019-12-07 18:27","2019-12-07 18:28","He is hurt","Broken back", "Peter", "Griffin"); /*This insert doesn't work because there are multiple tables that are being joined also contains a GROUP BY clause*/

INSERT INTO patientContactView
VALUES ("Chris","Tucker","5196576574","ChrisTucker@yahoo.com","6020 MEADOWBROOK DR, Shannon, Quebec 86529-4812, Canada");/*Unlike before our FROM specifies only one table. We also dont have a GROUP BY here and defaults were added so that the base table is satisfied*/

SELECT * FROM appointmentview;
SELECT * FROM patientContactView;