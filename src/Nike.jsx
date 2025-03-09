import { useState } from "react";
import './styles/nike.css';


export default function Page() {

    
    const [load, setLoad] = useState("Place Order");
    const [cart, setCart] = useState([]);
    const [bought, setBought] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const Products = ([
        {
            id: 0,
            name: "Nike Black Running Shoes",
            price: 7000,
            imgUrl: "/src/assets/Nike/nike_shoes.jpeg",
            stock: true
        },

        {
            id: 1,
            name: "JBL Speaker",
            price: 3000,
            imgUrl: "/src/assets/Nike/jbl_speaker.jpg",
            stock: true
        },

        {
            id: 2,
            name: "ASUS ROG laptop intel i9, 16GB RAM",
            price: 90000,
            imgUrl: "/src/assets/Nike/ASUS_ROG.jpg",
            stock: true
        },

        {
            id: 3,
            name: "Sony PlayStation 5",
            price: 50000,
            imgUrl: "/src/assets/Nike/PS5.jpeg",
            stock: false
        },

        {
            id: 4,
            name: "Adidas Black Running Shoes",
            price: 5000,
            imgUrl: "/src/assets/Nike/adidas_shoes.jpeg",
            stock: true
        }
    ])

    function updateCart(product) {
        
        let index = cart.findIndex( (cartItem) => cartItem["id"] === product["id"]);
        //finding if item is already present, if index === -1 ,it means item is not already in the cart
        if (index === -1){
            setCart([...cart, product]);
        }

        else {
            let newCart = cart.map( (cartItem, i) => {
                if (i === index){
                    let newQty = cartItem["qty"] + product["qty"];
                    let newPrice = newQty*product["price"];
                    return cartItem = {
                        ...cartItem, qty: newQty, price: newPrice
                    }
                }
                else {
                    return cartItem;
                }
            })
            setCart(newCart);
        }
        
        
    }


    //Component for each product card
    function Product({productId, name, price, imgUrl, stock}) {
        
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

                <label>Qty: <select onChange={ (e) => qty = parseInt(e.target.value)} className="qty">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                </label>

                <div class="buttons" >
                    <button className="cart" onClick={() => 
                    //if product in stock returns product details to updateCart function
                    {if(qty>0){
                            updateCart(
                                {
                                    "id": productId,
                                    "name": name,
                                    "qty": qty,
                                    "price": price*qty
                                })}}}>
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

    //bringing new cart products to placed orders
    function loadAllCartOrders() {
        setTimeout( () => {
            
            cart.map( (product) =>
                {
                    setBought( (oldList) => [...oldList, product]);
                    setTotal(oldTotal => oldTotal + product.price);
                    setTotalItems(oldSum => oldSum + product.qty)
                    setCart([]);
                })
            setLoad("Place Order");
        },2000);
    }

    function placeCartOrder() {
        if (cart.length === 0){
            setLoad("Place Order")
            return;
        }

        if (bought.length === 0) {
            loadAllCartOrders()
        }

        else {
            cart.map( (cartItem) => {
                //finding if item is already present in placed orders
                
                const index = bought.findIndex( (Item) => Item["id"] === cartItem["id"]);

                if (index === -1) {
                    setTimeout ( () => {
                        setBought([...bought, cartItem]);
                        setTotal( oldTotal => oldTotal + cartItem["price"]);
                        setTotalItems( oldSum => oldSum + cartItem["qty"]);
                        setLoad("Place Order")
                    }, 2000)
                    
                }
                else {

                    const newQty = bought[index]["qty"] + cartItem["qty"];
                    const newPrice = bought[index]["price"] + cartItem["price"];
                    
                    //LOading + replacing duplicate item's price and quantity(qty)
                    setTimeout( () => {
                        setBought( bought.map( (Item, i) => 
                        {
                            if(i === index){
                                return Item = {
                                    ...Item,
                                    "qty": newQty,
                                    "price": newPrice
                                };
                            }
                            else{
                                return Item;
                            }
                        }))

                        setTotal(oldTotal => oldTotal + cartItem["price"]);
                        setTotalItems(oldSum => oldSum + cartItem["qty"])
                        setLoad("Place Order");
                    },2000)
                }
            })
            //emptying the cart
            setCart([]);
        }
        
        
    }
    
    function reset() {
        setCart([]);
        setBought([]);
        setTotal(0);
        setTotalItems(0);
    }
        

    return(
        <div className="amazonBody">
        <h3 className="bg-warning text-center text-white p-3"><a href="https://www.amazon.in/" target="_blank" className="text-white">
                Go to Amazon
            </a>
        </h3>

        <div className="products">
            {
                Products.map( (Item) =>
                    <Product key={Item.id} productId={Item.id} name={Item.name} price={Item.price} imgUrl={Item.imgUrl} stock={Item.stock} />
                )
            }
        </div>
        

        <div class="orders" id="max-order">
            <div className="order-head">
                <h1>Orders</h1>
                <button className="m-btn" onClick={minimize}>v</button>
            </div>
            
            <p style={{marginBottom:"0px"}}>Cart: </p>
            <div className="order-div">
                <table className="order-table">
                {
                        cart.map( (Item) => 
                        <tr className="order-row">
                            <td><p className="order-list" >{Item.qty}x</p></td>
                            <td><p className="order-list" title={Item.name}>{Item.name}</p></td>
                            <td><p className="order-list">₹{Item.price}</p></td>
                        </tr>)
                    }
                    
                </table>
            </div>
            
                
            <p style={{marginBottom:"0px"}}>Orders Placed: </p>
            
            <div className="order-div">
                <table className="order-table">
                {
                        bought.map( (Item) => 
                        <tr className="order-row">
                            <td><p className="order-list" >{Item.qty}x</p></td>
                            <td><p className="order-list" title={Item.name}>{Item.name}</p></td>
                            <td><p className="order-list">₹{Item.price}</p></td>
                        </tr>)
                    }
                    
                </table>
            </div>

            <p>Total: ₹{total} ({totalItems} items)</p>
            <button className="cart" onClick={() => {setLoad("Loading..."); placeCartOrder()}}>{load}</button>
            <button className="reset" onClick={reset}>Reset</button>

        </div>




        <div className='min-orders' id="min-order">
            <h3 className="order-label">Orders</h3>
            <button className="m-btn" onClick={maximize}>^</button>
        </div>
    </div>
    )
}