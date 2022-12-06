import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import moment from 'moment';


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
function Index() {

    var event = [];

    window.onload =  async (e) => {
        const url = `http://localhost:3000/api/appointment/forDoctor`
        const res = await axios.post(url,{ familyDoctorMINC : localStorage.getItem("MINC")});
        console.log(res.data.result);
        let date = moment("2004-08-14T22:00:00.000Z").format('YYYY, D, MM');
        console.log(date);

        for(let i = 0; i<res.data.result.length;i++){
            event.push(
                {
                    title: res.data.result[i].notes,
                    start: moment(res.data.result[i].startDateTime).format('YYYY, D, MM'),
                    end: moment(res.data.result[i].endDateTime).format('YYYY, D, MM')
                }
            )
        }
        console.log(event);

    };
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(event);

    function handleAddEvent() {
        console.log(newEvent.start);
        for (let i=0; i<allEvents.length; i++){

            const d1 = new Date (allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);

             if (
              ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
                (d4 <= d3) )
              )
            {   
                alert("Conflict Error"); 
                break;
             }
    
        }
        
        
        setAllEvents([...allEvents, newEvent]);
    }

    return (

        <div className="App">
            <h1>Your Appointments</h1>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 850, margin: "40px" }} />
        </div>
    );
}

export default Index;