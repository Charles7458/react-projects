import { useState } from "react";
import './styles/nike.css';


export default function Nike() {

    const [pval, setPval] = useState(0);
    const [cval, setCval] = useState(0);
    const [load, setLoad] = useState("");
    const [price, setPrice] = useState(0);

    
    function updatePval() {
        setPval(pval + 1);
        
    }

    function addCval() {
        setCval(cval + 1);
        setPrice(price+39);
    }

    function updateCval() {
        setTimeout ( () => {
                setCval(cval+pval);
                setPval(0);
                setPrice(price+pval*39);
                setLoad("");
        }, 3000)
        
    }

    return(
        <>
        <div class="card">
            <a href="https://www.amazon.in/" target="_blank">
                Back to Amazon
            </a>
            <p class="shoes">
                Nike Black Running Shoes
            </p>

            <img src="/src/assets/shoes.jpeg" class="pic" />
            
            <p class="price">
                $39 - in stock.
            </p>
            
            <p>
                free delivery  tomorrow
            </p>
            
            <div class="buttons" >
                <button className="cart" onClick={updatePval}>
                    Add to Cart
                </button>
                
                <button class="buy" onClick={addCval}>
                    Buy now
                </button>
            </div>
            
        </div>

        <div class="orders">
            <h1>Orders</h1>
            <p>Cart: {pval}</p>
            <p>Orders Placed: {cval}</p>
            <p>{load}</p>
            <p>Total: ${price}</p>
            <button className="cart" onClick={() => { if(pval>0){setLoad("Loading..."); updateCval()}}}>Place Order</button>
        </div>

    </>
    )
}