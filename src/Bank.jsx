import { useState } from 'react';
import './styles/bank.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';






export default function Bank(){

    const [login, setLogin] = useState(false);
    const [balance, setBalance] = useState(0);
    const [name, setName] = useState("");
    const [Pin, setPin] = useState(NaN);
    const [modalText, setModalText] = useState({
        firstLine: "",
        secondLine: ""
    });
    const [show, setShow] = useState(false);

    //function to check pin
    function pinCheck() {
        let newPin = prompt("Enter your pin:");
        while (isNaN(newPin)){
            alert("Enter valid pin!")
            newPin = prompt("Enter your pin:")
        }
        
        if(newPin === Pin) {
            return true;
        }
        else{
            alert("Wrong pin. Try again.")
            return false;
        }
    }

    //function to show Modal
    function showModal(first, second) {
        setModalText({firstLine: first, secondLine: second });
        setShow(true);
    }

    //component for Modal
    function CreationModal({text}) {

        const handleClose = () => setShow(false);
      
      
        return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{color:"black"}}>Status</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{color:"black"}}>
                <p>{text.firstLine}</p>
                <p>{text.secondLine}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        );
      }

    //component for floating label input

    function FloatingInput({type, Label, id, place_holder, max_length}) {
        return (
            <FloatingLabel
              controlId="floatingInput"
              label={Label}
              className="mb-3 text-dark"
            >
              <Form.Control type={type} placeholder={place_holder} id={id} maxLength={max_length} autoComplete='off'/>
            </FloatingLabel>
        );
      }


    let updatedata =() =>
    {
        let Name = document.querySelector("#Name")
        let Deposit = document.querySelector("#Deposit")
        let Pin = document.querySelector("#Pin")
        const Pinregex = new RegExp("^\[0-9]{4}$");

        if (Name.value === "") {
            showModal("Name should not be blank!", "");
            return
        }

        if (Deposit.value < 100) {
            showModal("Deposit should not be less than 100 !", "");
            return
        }

        if(!(Pinregex.test(Pin.value))) {
            showModal("Pin should be a four digit number!", "");
            return
        }

        setName(Name.value);
        setBalance(parseInt(Deposit.value));
        setPin(Pin.value);
        setLogin(true);
        showModal("Account created Succesfully!", "");
    }

    function deposit() {
        let amount = parseFloat(prompt("Enter the amount:"));
        if(isNaN(amount)){
            showModal("Deposit unsuccessful! Not a valid amount");
            return;
        }
        if(pinCheck()) {
            let newBalance = balance+amount;
            setBalance(newBalance);
            showModal("Deposit Successful!", `Current Balance: ${newBalance}`);
        }
    }

    function withdraw() {

        let amount = parseFloat(prompt("Enter the amount:"));
            if(isNaN(amount)){
                showModal("Withdraw unsuccessful! Not a valid amount");
                return;
            }
            if(amount> balance){
                showModal("Withdraw amount is greater than the balance!", "");
                return;
            }
        if(pinCheck()){
            
            let newBalance = balance - amount;
            setBalance(newBalance);
            showModal("Withdraw Successful!", `Current Balance: ${newBalance}`);
        }
    }

    function BankAccount() {
        
        function displayDetails() {
            showModal(`Account Holder: ${name}`,`Balance: ${balance}`);
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
            <FloatingInput type="text" place_holder="Name" Label="Name" max_length={max_length} id="Name" />
            <FloatingInput type="number" place_holder="Deposit Amount" Label="Deposit Amount (> 100)" max_length={max_length} id="Deposit" />
            <FloatingInput type="password" place_holder="Pin" Label="Pin" max_length={4} id="Pin" />
            <button type="submit" className='btn' onClick={updatedata}>Create Account</button>
        </form>
        )
    }

    

    return(
        <div className="bankBody">
            <div className="wrapper">
                <CreationModal text={modalText}/>
                <h1> 🏦<br/>Bank</h1>
                {login ?  <BankAccount /> : <CreateAccount />}
                
            </div>
        </div>
    )
}


