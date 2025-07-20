export type Stock = {
    id: string;
    ticker: string;
    name: string;
    quantity: number;
    price: number;
    availableShares: number;
    marketCap: number;
}

export type StockProps = {
    stocks: Stock[];
    onCallback: (id: string, qty: number) => void;
    actionTitle: string;
};

export type StockRowProps = {
    s: Stock;
    onCallback: (id: string, qty: number) => void;
    actionTitle: string

}