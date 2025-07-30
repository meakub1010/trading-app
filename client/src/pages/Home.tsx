import { useCallback, useEffect, useRef, useState } from "react";
import { Stock } from "../types/types";
import { Blotter } from "../features/blotter/components/Blotter";
import { Market } from "../features/market/components/Market";
import { Controlls } from "../features/components/Controls";
import { marketApi } from "../api/marketApi";
import { useSocketDataUpdater } from "../hooks/useSocketDataUpdater";

const Home = () => {
    console.log("Home component loaded");
    const [stocks, setStocks] = useState<Stock[]>([]);

    useSocketDataUpdater(setStocks);

  const handleBuy = useCallback(async (id: string) => {
    console.log('buy')
    try {
      await marketApi.buy(id, 1);
    }
    catch (error) {
        console.error("Error buying stock:", error);
    }
    
  }, []);

  const handleSell = useCallback(async (id: string, qty: number) => {
    console.log('sell');
    try{
      await marketApi.sell(id, qty);
    }
    catch (error) {
        console.error("Error selling stock:", error);
    }    
  }, []);

  return (
    <div>
        <header className="mb-4">
            <h1>Welcome to Market Trading App</h1>
        </header>      
      <Market stocks={stocks} onCallback={handleBuy} actionTitle='Buy' />
      <Blotter stocks={stocks} onCallback={handleSell} actionTitle='Sell' />
      <Controlls />
    </div>
  );
};

export default Home;
