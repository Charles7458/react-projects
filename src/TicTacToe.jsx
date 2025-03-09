import { useState } from 'react';
import './styles/tictactoe.css'



function Button({value, onButtonClick, id}) {
    let idd = `${id}`;
    return (
        <button  className='square' onClick={onButtonClick} id={idd}>
            {value}
        </button>
    )

    
}

function Board({xIsNext, squares, onPlay}) {

    

    function colorSquares(wonSquares){
        const [a,b, c] = wonSquares;
        let i = `${a}`;
        let j = `${b}`;
        let k = `${c}`;
        
        let box1 = document.getElementById(i);
        let box2 = document.getElementById(j);
        let box3 = document.getElementById(k);

        box1.style.backgroundColor = "green";
        box1.style.color = "white";

        box2.style.backgroundColor = "green";
        box2.style.color = "white";

        box3.style.backgroundColor = "green";
        box3.style.color = "white";
        }
        // let var const
    
    function handleClick(index) {

        if (calculateWinner(squares)) {
            
            return;
        }

        if (squares[index]) {
            return;
        }

        let nextSquare = squares.slice()
        if(xIsNext) {
            nextSquare[index] = "X"
        }
        else{
            nextSquare[index] = "O"
        }
        
        onPlay(nextSquare);
    }

    let winner = calculateWinner(squares);
    let Status ;
    if(winner){
        Status = `Winner: ${winner}`;
        let wonSquares = calculateColorSquares(squares);
        colorSquares(wonSquares);
    }

    else if(squares[0]){

        Status = "Draw";

        for(let i=0;i<9;i++){
            if(squares[i]==null){
                Status = `Player: ${(xIsNext ? "X" : "O")}`;
                break;
            }
        }
    }

    else {
        Status = `Player: ${(xIsNext ? "X" : "O")}`;
    }


    return(
        <div className='gameboard-wrapper'>
        <h1>{Status}</h1>
        <div className='gameboard'>
            
        {squares.map( (s,i) => {
                return <Button value={squares[i]} onButtonClick ={() =>handleClick(i) } id={i} />
            }

            )}

        </div>
        </div>
    )
}

export default function Game() {
    
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove %2 === 0;
    let currentSquares = history[currentMove];

    function handlePlay(nextSquares){
        setHistory([...history.slice(0, currentMove+1), nextSquares]);
        setCurrentMove(currentMove+1);
    }

    

    function jumpTo(move) {
        setCurrentMove(move);
        setHistory([...history.slice(0, move+1)])
        colorReset()
    }


    const moves = history.map( (squares, move) =>
    {
        let description;
        if(move > 0 && move< (history.length-2)){
            description = `Go to move # ${move}`;
        }
        else if ( move == (history.length-2)){
            description = "Go to previous move";
        }
        else if (move == (history.length-1) ) {
            return <p>You are at move # {move}</p>
        }
        if(move == 0) {
            description = "Go to game start";
        }

        return(
            <li key={move} className='steps'>
                <button onClick={() =>jumpTo(move)}>{description}</button>
            </li>
        )
    }
    )

    return(
        <div className='gameBody'>
            <div className='main-div'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>

                    <ol className='steps-list'>
                        {moves}
                    </ol>
            </div>
        </div>
    )
}

function calculateWinner(squares){

    const Lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    
    for (let i =0; i< Lines.length; i++) {
        const [a, b, c] = Lines[i];

        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

function calculateColorSquares(squares){

    const Lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    
    for (let i =0; i< Lines.length; i++) {
        const [a, b, c] = Lines[i];

        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            
            return [a, b, c];
        }
    }
}
