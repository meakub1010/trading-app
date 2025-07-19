import { JSX } from "react";
import { StockRowProps } from "../../../types/types";


export const StockRow = ({s, onCallback, actionTitle}: StockRowProps) : JSX.Element => {
    
    
    return (
        <tr>
            <td>{s.availableShares > 0 && <button onClick={() => onCallback(s.id, 1)}>{actionTitle}</button>}</td>
            <td>{s.availableShares}</td>
            <td>{s.ticker}</td>
            <td>{s.name}</td>
            <td>{s.quantity}</td>
            <td>{s.price}</td>
            <td>{s.marketCap.toFixed(2)}</td>
        </tr>
    );
}