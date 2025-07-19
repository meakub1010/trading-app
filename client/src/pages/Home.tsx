import { useCallback, useRef, useState } from "react";
import { Stock } from "../types/types";
import { Blotter } from "../features/blotter/components/Blotter";
import { Market } from "../features/market/components/Market";
import { Controlls } from "../features/components/Controls";
import { useWebSocket } from "../hooks/useWebSocket";

const Home = () => {
    const [stocks, setStocks] = useState<Stock[]>([
    {
      id: 1,
      availableShares: 10,
      ticker: 'AAPL',
      name: 'Apple Inc.',
      quantity: 0,
      price: 150,
      marketCap: 2400000000000,
    },
    {
      id: 2,
      availableShares: 5,
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 0,
      price: 2800,
      marketCap: 1800000000000,
    },
  ]);

    const onConnect = useCallback(() => console.log('connected'), []);
    const onDisconnect = useCallback(() => console.log('disconnected'), []);
    const onError = useCallback((err:any) => console.log(err), []);
    
    const onMessage = useCallback((msg: any) => {
        const map = new Map<string, Stock>(Object.entries(msg));
        const arr: Stock[] = Array.from(map.values());
        requestIdleCallback(() => {
            setStocks(prev => {
                const map = new Map(prev.map(item => [item.id, item]));

                for (const newItem of arr) {
                    map.set(newItem.id, { ...map.get(newItem.id), ...newItem });
                }

                return Array.from(map.values());
            });
        });
        

    }, []);


    const messageQueue = useRef<Stock[]>([]);
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const onMessage2 = useCallback((msg: Object) => {
        const newStocks = Object.values(msg); // or transform as needed
        messageQueue.current.push(...newStocks);

        if (timeout.current) return;

        timeout.current = setTimeout(() => {
            setStocks(prev => {
            const map = new Map(prev.map(item => [item.id, item]));

            for (const newItem of messageQueue.current) {
                map.set(newItem.id, { ...map.get(newItem.id), ...newItem });
            }

            messageQueue.current = [];
            timeout.current = null;
            console.log('processed new messages');
            const result: Stock[] = Array.from(map.values());
            console.log(result.length)
            return result;
            });
        }, 100); // Batch every 100ms
    }, []);

    const {client, isConnected} = useWebSocket('http://localhost:8080/ws', {
        onMessage: onMessage2,
        onConnect: onConnect,
        onDisconnect: onDisconnect,
        onError: onError,
  });


  const handleBuy = useCallback((id: number, qty: number) => {
    console.log('handleBuy', id, qty);
    setStocks(prev =>
      prev.map(s =>
        s.id === id && s.availableShares >= qty
          ? { ...s, availableShares: s.availableShares - qty, quantity: s.quantity + qty }
          : s
      )
    );
  },[]);

  const handleSell = useCallback((id: number, qty: number) => {
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
