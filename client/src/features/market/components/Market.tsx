import { StockProps } from "../../../types/types";
import { StockRow } from "./StockRow";


export const Market = ({stocks, onCallback, actionTitle}: StockProps) => {	

    return (
        <table>
            <thead>
                <tr>
                    <th>Buy</th>
                    <th>Qty</th>
                    <th>Ticker</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>
                {
                    stocks.map(stock => (
                       <StockRow key={stock.id} s={stock} onCallback={onCallback} actionTitle={actionTitle}/>
                    ))
                }                
            </tbody>
        </table>
    );
}