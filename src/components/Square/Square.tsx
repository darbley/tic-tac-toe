export type PlayerValue = 'X' | 'O' | null | 'BOTH';


const Square = ({onClick, value, winner} : 
    {
        onClick: () => void;
        value: PlayerValue;
        winner: PlayerValue;
    }) => {

    if(!value){
        return <button className={`square`} onClick={onClick} disabled={Boolean(winner)}></button>
    }
    return (
        <button className={`square square_${value.toLowerCase()}`} onClick={onClick}>
            <p>{value}</p>
        </button>

    )
}
export default Square;