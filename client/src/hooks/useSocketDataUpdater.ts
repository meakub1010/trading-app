import { useCallback, useEffect, useRef } from "react";
import { Stock } from "../types/types"
import { useWebSocket } from "./useWebSocket";
import { mergeStocks } from "../utils/mergeStocks";


export const useSocketDataUpdater = (setStocks: React.Dispatch<React.SetStateAction<Stock[]>>) => {
    const onConnect = useCallback(() => console.log('connected'), []);
    const onDisconnect = useCallback(() => console.log('disconnected'), []);
    const onError = useCallback((err:any) => console.log(err), []);

    const messageQueue = useRef<Stock[]>([]);
    const timeout = useRef<NodeJS.Timeout | null>(null);
    
    const onMessage = useCallback((msg: Stock | Stock[]) => {
        const newStocks = Array.isArray(msg) ? msg : [msg];
        messageQueue.current.push(...newStocks);

        if (timeout.current) return;

        timeout.current = setTimeout(() => {
        setStocks((prevStocks) => {
            const merged = mergeStocks(prevStocks, messageQueue.current);
            messageQueue.current = [];
            timeout.current = null;
            return merged;
        });
    }, 100);

    },[]);
    
    useEffect(() => {
          return () => {
            if(timeout.current){
              clearTimeout(timeout.current);
            }
          }
        }, [setStocks]);
    
    const {client, isConnected} = useWebSocket('http://localhost:8080/ws', {
            onMessage: onMessage,
            onConnect: onConnect,
            onDisconnect: onDisconnect,
            onError: onError,
            maxRetry: 3
        });
    
};