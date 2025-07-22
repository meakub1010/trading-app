import { StockProps } from "../../../types/types";
import { StockRow } from "./StockRow";
import {memo} from 'react';


export const Market = memo(({stocks, onCallback, actionTitle}: StockProps) => {	
    
    return (
        
        <div>
            <h2 className="mb-3">Market Stocks</h2>
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
                    <tbody>
                        {
                            stocks.map(stock => (
                            <StockRow key={stock.id} s={stock} onCallback={onCallback} actionTitle={actionTitle}/>
                            ))
                        }                
                    </tbody>
                </table>
            </div>
        </div>
    );
});