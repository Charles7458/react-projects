import { useState } from "react";

export default function Trial() {

    const [name, setName] = useState("");
    const [check, setCheck] = useState(false);
    const [Attendance, setAttendance] = useState("Absent");
    const [people, setPeople] = useState([]);
    function updatedata() {
        let newPerson = 
        {
            name: name,
            attendance: Attendance
        }
        setPeople([...people, newPerson])
        setName("")
        setCheck(false);
        setAttendance("Abesnt");
    }

    return (
        <>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{margin:"20px",display:"block"}}/>
        <label style={{margin:"20px",display:"block"}}>
            <input type='checkbox' checked={check} onClick={(e) => {setCheck(!check);setAttendance(e.target.checked ? "Present": "Absent")}}  />Attendance
        </label>
        <button onClick={updatedata} style={{margin:"20px",display:"block"}}>Submit</button>
        <div style={{margin:"20px"}}>
            {
                people.map( (person) =>
                    <p>{person.name}, {person.attendance}</p>
                )
            }
        </div>
        </>
    );
}

