import React, { useEffect, useState } from 'react'
import PatientOverview from '../PatientOverviewPage/PatientOverview'

export default function SearchPatient() {
    var healthCard = '';
    const [patientName, setName] = useState('');
    
    const handleChangeName = e=>{
        setName(e.target.value);
    }

    useEffect(() => {
        if(patientName !== '') {
            fetch(`/api/patient/name/${patientName}`)
            .then(res => res.json()
            .then(data => {
                if(data.length === 0) {
                    let list = document.getElementById('patientDetails')
                    list.replaceChildren('')
                } else {
                    populateTable(data);
                }
            })
            )
        } else if (patientName === '') {
            let list = document.getElementById('patientDetails')
            list.replaceChildren('')
        }
    }, [patientName])

    const handleSubmit = (e) =>{
        e.preventDefault();
      }



      function populateTable(data) {
        let list = document.getElementById('patientDetails')
        list.replaceChildren('')

        data.forEach(element => {
            const row = document.createElement('tbody');
            const tr = document.createElement('tr');
            tr.classList = "data";

            const fName = document.createElement('td');
            const lName = document.createElement('td');
            const dob = document.createElement('td');
            const pNo = document.createElement('td');
            const email = document.createElement('td');
            const address = document.createElement('td');

            fName.className = "heading_fName2";
            lName.className = "heading_lName2";
            dob.className = "heading_dob2";
            pNo.className = "heading_pNo2";
            email.className = "heading_email2";
            address.className = "heading_add";

            tr.addEventListener("click", function() {
                console.log(element.healthCardNumber);
            })

            fName.appendChild(document.createTextNode(`${element.firstName}`));
            lName.appendChild(document.createTextNode(`${element.lastName}`)); 
            dob.appendChild(document.createTextNode(`${element.dateOfBirth.replace('T', ' ').replace('Z', '').replace(':00.000', '')}`)); 
            pNo.appendChild(document.createTextNode(`${element.phoneNo}`)); 
            email.appendChild(document.createTextNode(`${element.email}`)); 
            address.appendChild(document.createTextNode(`${element.address}`)); 

            tr.appendChild(fName);
            tr.appendChild(lName);
            tr.appendChild(dob);
            tr.appendChild(pNo);
            tr.appendChild(email);
            tr.appendChild(address);
            
            row.appendChild(tr);
            list.appendChild(row);
        });
      }


    return(<>
        <span>
            <input type = "text" className = "searchName" placeholder = "Search by Patient Name" onChange={handleChangeName} value = {patientName} />
            <button className = "button buttonName" onClick={handleSubmit}>Search</button>
        </span>

        
        <div className = "patient">
            <table id = "patientHeadings">
                <thead>
                    <tr id = "heading">
                        <th className = "heading_fName">First Name</th>
                        <th className = "heading_lName">Last Name</th>
                        <th className = "heading_dob">Date of Birth</th>
                        <th className = "heading_pNo">Phone Number</th>
                        <th className = "heading_email">Email</th>
                        <th className = "heading_address">Address</th>
                    </tr>
                </thead>
            </table>
            <table id = "patientDetails">
                <tbody>
                    <tr id = "data">
                    </tr>
                </tbody>
            </table>
        </div>
                
            

    </>)
}