import { JSX, useCallback } from "react";
import { StockRowProps } from "../../../types/types";


export const StockRow = ({s, onCallback, actionTitle}: StockRowProps) : JSX.Element => {
    console.log("StockRow component loaded");

    const displayAction = actionTitle === 'Buy' ? s.availableShares > 0 : s.quantity > 0;
    
    //const c = actionType === 'buy' ? 'btn-success' : 'btn-danger';

    // improvement: useCallback to avoid unnecessary re-renders

    const handleClick = useCallback(() => {
        onCallback(s.id, 1);
    }, [s.id, onCallback]);


    return (
        <tr>
            <td className="p-1"> {displayAction === true && <button className="btn btn-success btn-sm" onClick={handleClick}>{actionTitle}</button>}</td>
            <td className="p-1">{s.ticker}</td>
            <td className="p-1">{s.quantity}</td>
            <td className="p-1">{s.availableShares}</td>
            <td className="p-1">{s.price.toFixed(4)}</td>
            <td className="p-1">{s.name}</td>
            <td className="p-1">{s.marketCap.toFixed(2)}</td>
        </tr>
    );
}