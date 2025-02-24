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

        setName(Name);
        setBalance(Deposit);
        setLogin(true);
    }

    function BankAccount() {
        let [bal, setBal] = useState(0);

        setBal(balance);
        function deposit(amount) {
            setBalance(balance+amount);
        }
        function withdraw(amount) {
            setBalance(balance-amount);
        }
        return(
        <>
        <h1>Welcome, User</h1>
        <button>Deposit</button>
        <button>Withdraw</button>
        </>
        )
    }

    function CreateAccount(){
        const max_length = 25;
        <form onSubmit={ (e) =>
            e.preventDefault()
            }>

            <input placeholder="Name" maxLength={max_length} id='Name'/>
            <input placeholder="Deposit Amount" maxLength={max_length} id='Deposit'/>
            <button type="submit" className='btn' onClick={updatedata}>Create Account</button>
        </form>
    }

    function Display(){
        <>
            <CreateAccount />
            <BankAccount />
        </>

    }

    return(
        <div className="wrapper">
            <h1>Bank of <br/> <span>Will O' Wisp</span></h1>
            <Display />
        </div>
    )
}


