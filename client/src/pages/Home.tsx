import { useCallback, useEffect, useRef, useState } from "react";
import { Stock } from "../types/types";
import { Blotter } from "../features/blotter/components/Blotter";
import { Market } from "../features/market/components/Market";
import { Controlls } from "../features/components/Controls";
import { useWebSocket } from "../hooks/useWebSocket";
import { marketApi } from "../api/marketApi";
import { mergeStocks } from "../utils/mergeStocks";
import { useSocketDataUpdater } from "../hooks/useSocketDataUpdater";

const Home = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    useSocketDataUpdater(setStocks);

    // const onConnect = useCallback(() => console.log('connected'), []);
    // const onDisconnect = useCallback(() => console.log('disconnected'), []);
    // const onError = useCallback((err:any) => console.log(err), []);

    // const messageQueue = useRef<Stock[]>([]);
    // const timeout = useRef<NodeJS.Timeout | null>(null);

    // useEffect(() => {
    //   return () => {
    //     if(timeout.current){
    //       clearTimeout(timeout.current);
    //     }
    //   }
    // }, []);

    // const onMessage = useCallback((msg: Stock | Stock[]) => {
    //   const newStocks = Array.isArray(msg) ? msg : [msg];
    //   messageQueue.current.push(...newStocks);

    //   if (timeout.current) return;

    //   // make sure clear the timeout on unmount
    //   timeout.current = setTimeout(() => {
    //       setStocks(prevStocks => {
    //           const merged = mergeStocks(prevStocks, messageQueue.current);
    //           messageQueue.current = [];
    //           timeout.current = null;
          
    //      return merged;
    //       });
    //   }, 100);

    // }, []);

    // const {client, isConnected} = useWebSocket('http://localhost:8080/ws', {
    //     onMessage: onMessage,
    //     onConnect: onConnect,
    //     onDisconnect: onDisconnect,
    //     onError: onError,
    // });


  const handleBuy = useCallback((id: string) => {
    console.log('buy')
    marketApi.buy(id, 1);
  }, []);

  const handleSell = useCallback((id: string, qty: number) => {
    console.log('sell');
    marketApi.sell(id, 1);
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
