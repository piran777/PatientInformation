SELECT DISTINCT otherDoctorMINC, COUNT(*) AS numberOfReferrals, specialization
FROM referral LEFT JOIN otherdoctor ON (MINC = otherDoctorMINC ) 
GROUP BY otherDoctorMINC, specialization;
			
SELECT DISTINCT a.familyDoctorMINC, f.firstName AS DoctorFirstName, f.lastName AS DoctorLastName, COUNT(a.patientHealthCardNumber) AS numberOfPatients
FROM appointment a, familydoctor f
WHERE a.familyDoctorMINC = f.MINC
GROUP BY f.lastName, a.familyDoctorMINC
HAVING COUNT(a.patientHealthCardNumber) > 0
ORDER BY f.lastName;

SELECT *
FROM patient
WHERE DATEDIFF(curdate(), dateofbirth) < 6574; /*Gets all patients that are under 18*/

SELECT * FROM (SELECT fa.familyDoctorMINC AS MINC, Count(*) AS count FROM familydoctorpatientassignment AS fa GROUP BY MINC) AS t WHERE count = (SELECT Max(count) FROM (SELECT fa.familyDoctorMINC AS MINC, Count(*) AS count FROM familydoctorpatientassignment AS fa GROUP BY MINC) AS b);
 
SELECT p.firstName, p.lastName, s.type, s.startDate, s.endDate
FROM patient p, substance s
WHERE p.healthCardNumber = s.PatientHealthCardNumber
GROUP BY p.firstName, p.lastName,s.type, s.startDate,s.endDate
ORDER BY p.firstName;

SELECT *
FROM referral r
WHERE EXISTS(SELECT *
FROM otherdoctor o
WHERE (specialization = 'CARDIOLOGY' OR specialization = 'Cardiac Surgery') AND r.otherDoctorMINC = o.MINC)
ORDER BY r.appointmentID;

SELECT healthCardNumber, firstName, lastName
FROM patient p
WHERE NOT EXISTS(SELECT *
FROM immunization i
WHERE p.healthCardNumber = i.PatientHealthCardNumber)
ORDER BY lastName;