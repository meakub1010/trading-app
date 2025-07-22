import { Stock } from "../types/types";

export function mergeStocks(prevStocks: Stock[], updates: Stock[]): Stock[] {
    const stockMap = new Map(prevStocks.map(stock => [stock.id, stock]));
    
    for (const newItem of updates) {
        const updatedItem = {
            ...stockMap.get(newItem.id),
            ...newItem
        };
        stockMap.set(newItem.id, updatedItem);
    }

    return Array.from(stockMap.values());
}