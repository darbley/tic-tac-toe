"use client"
import Square, { PlayerValue } from "@/components/Square/Square";
import { useEffect, useState } from "react";

const Board = () => {

    const [squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(() => Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
    const [winner, setWinner] = useState<PlayerValue>(null);

    const handleSquareClick = (index: number) => {
        const newData = squares.map((val, i) => {
            if(index === i){
                return currentPlayer
            }
            return val
        })

        setSquares(newData)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    const handleReset = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
    
    }

    const calculateWinner = (squares: PlayerValue[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log('winner is ',squares[a]);
              return squares[a];
            }
          }
          return null;
    }

    useEffect(() => {
        const w = calculateWinner(squares)
        console.log('use effect ',w);
        if(w){
            setWinner(w)
        }
        if(!w && !squares.filter((square) => !square).length){
            setWinner('BOTH')
        }
    })

    return (
        <div>

            <div>
                <h1>Board</h1>
                <p>Hey {currentPlayer}, your turn</p>
                {winner && winner !== 'BOTH' && <p>Congrats {winner}, you win.</p>}
                {(winner && winner === 'BOTH') && <p>It's a tie. good game.</p>}
            </div>

            <div className="grid">
                {squares.map((_,index) => {
                    return   <Square
                                // the index represents the square number on the board.
                                key={index}
                                onClick={() => handleSquareClick(index)}
                                value={squares[index]}
                                winner={winner}
                            />
                })}
            </div>
            <button onClick={() => handleReset()}>Reset</button>

        </div>

    )
}
export default Board;