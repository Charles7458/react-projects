import { useState } from 'react'

export default function MovingBall(){
    let [position, setPosition] = useState(
        {
            x: 0,
            y:0,   
        }
    )
    let size = 60;

    return(
        <div onPointerMove=
        { e => {
            let newPosition = {x : e.clientX, y: e.clientY};
            setPosition(newPosition);
        }}

        style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            backgroundColor: "lightskyblue",
            overflow: "hidden"
        }}

        >

        <h1>The ball follows you till the ends of the screen. :)</h1>
            <div style={{
                position:"absolute",
                left: -10,
                top: -10,
                backgroundColor:"yellow",
                transform: `translate(${position.x}px, ${position.y}px)`,
                height: `${size}px`,
                width: `${size}px`,
                borderRadius: "50%" 
            }}>

            </div>
        </div>

    )
}