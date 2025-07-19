export type Stock = {
    id: number; // Assuming it's a unique identifier for buy/sell actions
    availableShares: number;
    ticker: string;
    name: string;
    quantity: number;
    price: number;
    marketCap: number;
}

export type StockProps = {
    stocks: Stock[];
    onCallback: (id: number, qty: number) => void;
    actionTitle: string;
};

export type StockRowProps = {
    s: Stock;
    onCallback: (id: number, qty: number) => void;
    actionTitle: string

}