import { StockProps } from "../../../types/types";
import { StockRow } from "../../market/components/StockRow";

export const Blotter = ({stocks, onCallback, actionTitle} : StockProps) => {


    return (
        <table>
            <thead>
                <tr>
                    <th>Sell</th>
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