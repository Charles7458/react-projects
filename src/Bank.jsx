import { useState } from 'react';
import './styles/bank.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';






export default function Bank(){

    let [login, setLogin] = useState(false);
    let [balance, setBalance] = useState(0);
    let [name, setName] = useState("");
    let [modalText, setModalText] = useState("");
    const [show, setShow] = useState(false);

    function showModal(text) {
        setModalText(text);
        setShow(true);
    }

    function CreationModal({text}) {
  

        const handleClose = () => setShow(false);
      
      
        return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{color:"black"}}>Status</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{color:"black"}}>{text}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        );
      }


    let updatedata =() =>
    {
        let Name = document.querySelector("#Name")
        let Deposit = document.querySelector("#Deposit")

        setName(Name.value);
        setBalance(parseInt(Deposit.value));
        setLogin(true);
        showModal("Account created Succesfully!");
    }

    function deposit() {
        let amount = parseFloat(prompt("Enter the amount:"));
        if(isNaN(amount)){
            return;
        }
        let newBalance = balance+amount;
        setBalance(newBalance);
        showModal(`Deposit successful!\n Current Balance: ${newBalance}`);
    }

    function withdraw() {
        let amount = parseFloat(prompt("Enter the amount:"));
        if(isNaN(amount)){
            return;
        }
        let newBalance = balance - amount;
        setBalance(newBalance);
        showModal(`Withdraw successful!\n Current Balance: ${newBalance}`);
    }

    function BankAccount() {
        
        function displayDetails() {
            showModal(`Account Holder: ${name}\n Balance: ${balance}`);
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
        }
        >

            <input type="text" placeholder="Name" maxLength={max_length} id='Name' autoComplete="off" />
            <input type="number" placeholder="Deposit Amount" maxLength={max_length} id='Deposit' autoComplete='off'/>
            <button type="submit" className='btn' onClick={updatedata}>Create Account</button>
        </form>
        )
    }

    

    return(
        <div className="wrapper">
            <CreationModal text={modalText}/>
            <h1> 🏦<br/>Bank of <br/><span>Will O' Wisp</span></h1>

            {login ?  <BankAccount /> : <CreateAccount />}
            
        </div>
    )
}


