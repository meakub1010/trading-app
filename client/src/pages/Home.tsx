import { useCallback, useEffect, useRef, useState } from "react";
import { Stock } from "../types/types";
import { Blotter } from "../features/blotter/components/Blotter";
import { Market } from "../features/market/components/Market";
import { Controlls } from "../features/components/Controls";
import { useWebSocket } from "../hooks/useWebSocket";

const Home = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);

    const onConnect = useCallback(() => console.log('connected'), []);
    const onDisconnect = useCallback(() => console.log('disconnected'), []);
    const onError = useCallback((err:any) => console.log(err), []);

    const messageQueue = useRef<Stock[]>([]);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      return () => {
        if(timeout.current){
          clearTimeout(timeout.current);
        }
      }
    }, [])

    const onMessage = useCallback((msg: Object) => {
      console.log('masg', msg);
      const newStocks = Array.isArray(msg) ? msg : [msg];
      messageQueue.current.push(...newStocks);

      if (timeout.current) return;

      // make sure clear the timeout on unmount
      timeout.current = setTimeout(() => {
          setStocks(prevStocks => {
              const stockMap = new Map(prevStocks.map(stock => [stock.id, stock]));

              for (const newItem of messageQueue.current) {
                  const updatedItem = {
                      ...stockMap.get(newItem.id),
                      ...newItem
                  };
                  stockMap.set(newItem.id, updatedItem);
              }

              messageQueue.current = [];
              timeout.current = null;

              return Array.from(stockMap.values());
          });
      }, 100);

    }, []);

    const {client, isConnected} = useWebSocket('http://localhost:8080/ws', {
        onMessage: onMessage,
        onConnect: onConnect,
        onDisconnect: onDisconnect,
        onError: onError,
  });


  const handleBuy = useCallback((id: string, qty: number) => {
    console.log('handleBuy', id, qty);
    setStocks(prev =>
      prev.map(s =>
        s.id === id && s.availableShares >= qty
          ? { ...s, availableShares: s.availableShares - qty, quantity: s.quantity + qty }
          : s
      )
    );
  },[]);

  const handleSell = useCallback((id: string, qty: number) => {
    console.log('handleSell', id, qty);
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
