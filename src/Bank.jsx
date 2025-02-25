import { useState } from 'react';
import './styles/bank.css'





export default function Bank(){

    let [login, setLogin] = useState(false);
    let [balance, setBalance] = useState(0);
    let [name, setName] = useState("");

    let updatedata =() =>
    {
        let Name = document.querySelector("#Name")
        let Deposit = document.querySelector("#Deposit")

        setName(Name.value);
        setBalance(parseInt(Deposit.value));
        setLogin(true);
    }

    function deposit() {
        let amount = parseFloat(prompt("Enter the amount:"));
        if(isNaN(amount)){
            return;
        }
        let newBalance = balance+amount;
        setBalance(newBalance);
    }

    function withdraw() {
        let amount = parseFloat(prompt("Enter the amount:"));
        if(isNaN(amount)){
            return;
        }
        let newBalance = balance - amount;
        setBalance(newBalance);
    }

    function BankAccount() {
        // let [Amount, setAmount] = useState(0);
        
        function displayDetails() {
            alert(`Account Holder: ${name}\nBalance: ${balance}`)
        }
        return(
        <>
        <h1 className="mb-5">Welcome, {name}</h1>
        
        <button className='mx-5 btn ' onClick={deposit}>Deposit</button>
        <button className='mx-5 btn ' onClick={withdraw}>Withdraw</button>
        <button className='btn  details' onClick={displayDetails}>Display Account Details</button>
        </>
        )
    }

    function CreateAccount(){
        const max_length = 25;
        return(
        <form onSubmit={ (e) =>
            e.preventDefault()
            }>

            <input type="text" placeholder="Name" maxLength={max_length} id='Name' autoComplete="off" />
            <input type="number" placeholder="Deposit Amount" maxLength={max_length} id='Deposit' autoComplete='off'/>
            <button type="submit" className='btn' onClick={updatedata}>Create Account</button>
        </form>
        )
    }

    

    return(
        <div className="wrapper">
            <h1> 🏦<br/>Bank of <br/><span>Will O' Wisp</span></h1>

            {login ?  <BankAccount /> : <CreateAccount />}
        </div>
    )
}


