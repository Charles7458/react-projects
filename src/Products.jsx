import { useState } from 'react';
import './styles/products.css'
export default function Products(){

    let productlist = [
        { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
        { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
        { category: "Fruits", price: "$1", stocked: true, name: "Banana" },
        { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
        { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
        { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
        { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
        { category: "Vegetables", price: "$3", stocked: true, name: "Broccoli"}
    ]
    let fruits = productlist.filter((d) => d.category == "Fruits");
    let veg = productlist.filter((d) => d.category == "Vegetables");

    let [list1, setList1] = useState(fruits.slice() );
    let [list2, setList2] = useState(veg.slice());
    let[isChecked, setIsChecked] = useState(false)

    function stockfilter(isChecked)
    {
        if(!isChecked){
        let fruitsstock = list1.filter((d) => d.stocked === true);
        setList1(fruitsstock);

        let vegstock = list2.filter((d) => d.stocked === true);

        setList2(vegstock);
        }

        else {
            setList1((fruits.slice() ));
            setList2((veg.slice()) );
        }
    }

    function checkHandler() {
        setIsChecked(!isChecked);
        stockfilter(isChecked)
    }

    function searcher(value) {
        if (value == ""){
            setList1(fruits.slice());
            setList2(veg.slice());
        }
        else {
        let text = `${value}*`.toLowerCase()
        let regex = new RegExp(text);
        setList1(list1.filter((d) => regex.test(d.name.toLowerCase())));
        setList2(list2.filter((d) => regex.test(d.name.toLowerCase())));
        }
    }

    return(
        <>
        <div className="wrapper">
            <form onSubmit={(e) => e.preventDefault()}>
            <input type="search" placeholder="Search..." onChange={(e) => searcher(e.target.value)}></input>
            <label><input type="checkbox" checked={isChecked} onChange={checkHandler}></input>Only filter products in stock</label>
            </form>
            <div className='tables'>
                <table>
                    <tr><th>Name</th><th>Price</th></tr>
                    <tr><th colSpan={2}>Fruits</th></tr>
                    {list1.map( (d,i) => {
                        let clr = "black";
                        if(!d.stocked){
                            clr="red"
                        }
                        else {
                            clr="black"
                        }
                        return (
                        <tr>
                            <td style={{color:`${clr}`}}>{d.name}</td>
                            <td>{d.price}</td>
                        </tr>
                        )
                    }
                    )}

                    <tr><th colSpan={2}>Vegetables</th></tr>
                    {list2.map( (d,i) => {
                        let clr ="black";
                        if(!d.stocked){
                            clr="red"
                        }
                        else {
                            clr="black"
                        }
                        return (
                        <tr>
                            <td style={{color:`${clr}`}}>{d.name}</td>
                            <td>{d.price}</td>
                        </tr>
                        )
                    }
                    )}
                </table>

            </div>
        </div>
        </>
    )
}