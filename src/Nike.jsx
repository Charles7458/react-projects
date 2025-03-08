import { useState } from "react";
import './styles/nike.css';


export default function Page() {

    
    const [load, setLoad] = useState("");
    const [cart, setCart] = useState([]);
    const [bought, setBought] = useState([]);
    const Products = ([
        {
            name: "Nike Black Running Shoes",
            price: 7000,
            imgUrl: "/src/assets/Nike/nike_shoes.jpeg",
            stock: true
        },

        {
            name: "JBL Speaker",
            price: 3000,
            imgUrl: "/src/assets/Nike/jbl_speaker.jpg",
            stock: true
        },

        {
            name: "ASUS ROG laptop intel i9, 16GB RAM",
            price: 90000,
            imgUrl: "/src/assets/Nike/ASUS_ROG.jpg",
            stock: true
        },

        {
            name: "Sony PlayStation 5",
            price: 50000,
            imgUrl: "/src/assets/Nike/PS5.jpeg",
            stock: false
        },

        {
            name: "Adidas Black Running Shoes",
            price: 5000,
            imgUrl: "/src/assets/Nike/adidas_shoes.jpeg",
            stock: true
        }
    ])

    function updateCart(itemName, qty, price) {
        
        if( cart.find( ({name}) => name == itemName ) === undefined ){

            let newItem = {
                name: {itemName},
                qty: {qty},
                price: {price}
            }
    
            setCart(cart.push(newItem));
        }
        
        else {
            let index = cart.findIndex(({name}) => name == itemName);
            setCart(cart.map( (item, i) =>{
                if(i===index) {
                    item.qty = item.qty+1;
                    item.price = price*item.qty;
                }
            }))
        }

    }



    function Product({name, price, imgUrl, stock, cartClick}) {
        
        let inStock ="";
        let delivery = "";
        let qty = 1;

        if(stock) {
            inStock = "in stock";
            delivery = "free delivery tomorrow";
            
        }

        else {
            inStock = "out of stock";
            delivery = "Product not available";
            qty = 0;
        }

        return ( 
            <div class="card">
                
                <p class="name">
                    {name}
                </p>
                <div className="pic-wrapper">
                    <img src={imgUrl} class="pic" />
                </div>
                
                { stock ? <p>₹{price} - <span style={{color:"rgb(30, 213, 30)"}}>{inStock}</span></p> : <p>₹{price} - <span style={{color:"rgb(197, 140, 9)"}}>{inStock}</span></p>}
                
                <p>
                    {delivery}
                </p>

                <label>Qty: <select onChange={ (e) => qty = e.target.value} className="qty">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                </label>

                <div class="buttons" >
                    <button className="cart" onClick={() => cartClick(name, qty, price)}>
                        Add to Cart
                    </button>
                    
                    <button class="buy" >
                        Buy now
                    </button>
                </div>
            </div>
         )
    }

    function minimize() {
        const maxOrder = document.getElementById("max-order");
        const minOrder = document.getElementById("min-order");

        
        maxOrder.style.display="none";
        minOrder.style.display="flex";

    }

    function maximize() {
        const maxOrder = document.getElementById("max-order");
        const minOrder = document.getElementById("min-order");

        
        maxOrder.style.display="block";
        minOrder.style.display="none";
    }

    return(
        <>
        <h3 className="bg-warning text-center text-white p-3"><a href="https://www.amazon.in/" target="_blank" className="text-white">
                Go to Amazon
            </a>
        </h3>

        <div className="products">
            {
                Products.map( (Item) =>{
                   return <Product name={Item.name} price={Item.price} imgUrl={Item.imgUrl} stock={Item.stock} cartClick={updateCart}/>
                })
            }
        </div>
        

        <div class="orders" id="max-order">
            <div className="order-head">
                <h1>Orders</h1>
                <button className="m-btn" onClick={minimize}>v</button>
            </div>
            
            <p>Cart: </p>
                {/* {
                    cart.map( (Item) => {
                        let values = Object.values(Item);
                        return <p>{values[0]}</p>
                    }
                    )
                } */}
            
            <p>Orders Placed: </p>
            <table className="order-table">
                {
                    bought.map( (Item) =>
                        <tr>
                            <td>{Item["qty"]}x </td>
                            <td>{Item["name"]}</td> 
                            <td>{Item["price"]}</td>
                        </tr>
                        
                    )
                }
            </table>
            <p>{load}</p>
            
            <button className="cart" >Place Order</button>
        </div>
        <div className='min-orders' id="min-order">
            <h3>Orders</h3>
            <button className="m-btn" onClick={maximize}>^</button>
        </div>
    </>
    )
}