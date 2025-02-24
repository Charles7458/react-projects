import { useState } from "react";

export default function Greeting() {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");

    
    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleReset(e){
        setFirstName("");
        setLastName("");
        setCount(0);
    }

    let [count, setCount] = useState(0);
    
    function counter() {
        setCount(count => count+1);
        setCount(count => count+1);
        setCount(count => count+1);
    }

    return(
        <>
        <form 
        onSubmit={e => e.preventDefault()}
        >
            <input 
            placeholder="First Name" 
            value={firstName}
            onChange={handleFirstName}
            />
            <input 
            placeholder="Last Name" 
            value={lastName}
            onChange={handleLastName}
            />
        </form>

        <h1>Hello, {firstName} {lastName}</h1>


        <button onClick={handleReset}>Reset</button>
        <button onClick={counter} style={{display:"block", marginTop:"50px"}}>Counter +3</button>
        <h1>Counter: {count}</h1>
        </>
    )
}