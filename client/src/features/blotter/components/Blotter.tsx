import { useEffect, useState } from "react";
import { Stock, StockProps } from "../../../types/types";
import { StockRow } from "../../market/components/StockRow";

export const Blotter = ({stocks, onCallback, actionTitle} : StockProps) => {

    const [purchasedStocks, setPurchasedStocks] = useState<Stock[]>([]);
    
    useEffect(() => {
        setPurchasedStocks(stocks.filter(i => i.quantity > 0));
    }, [stocks]);

    return (
        <div>
            <h2 className="mb-3">Purchased Stocks</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped align-middle table-sm m-0 text-nowrap">
                    <thead className="table-light text-xs">
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">Ticker</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Available Shares</th>
                            <th scope="col">Price</th>
                            <th scope="col">Name</th>                            
                            <th scope="col">Market Cap</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {
                            purchasedStocks.map(stock => (
                                <StockRow key={stock.id} s={stock} onCallback={onCallback} actionTitle={actionTitle}/>
                            ))
                        }                 
                    </tbody>
                </table>
            </div>
        </div>
    );
}