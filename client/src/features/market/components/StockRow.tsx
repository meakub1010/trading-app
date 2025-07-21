import { JSX } from "react";
import { StockRowProps } from "../../../types/types";


export const StockRow = ({s, onCallback, actionTitle}: StockRowProps) : JSX.Element => {
    
    const displayAction = actionTitle === 'Buy' ? s.availableShares > 0 : s.quantity > 0;
    
    return (
        <tr>
            <td className="p-1"> {displayAction === true && <button className="btn btn-success btn-sm" onClick={() => onCallback(s.id, 1)}>{actionTitle}</button>}</td>
            <td className="p-1">{s.ticker}</td>
            <td className="p-1">{s.quantity}</td>
            <td className="p-1">{s.availableShares}</td>
            <td className="p-1">{s.price.toFixed(4)}</td>
            <td className="p-1">{s.name}</td>
            <td className="p-1">{s.marketCap.toFixed(2)}</td>
        </tr>
    );
}